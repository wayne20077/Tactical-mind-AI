import React, { useEffect, useRef, useState } from 'react'
import { MatchState, CanvasDimensions, Player, Position } from '@/types'
import { calculateCanvasDimensions, pointInCircle, clamp, canvasToNormalized, normalizedToCanvas } from '@/utils/canvas'
import { drawPitch, drawPlayer, drawBall, drawUI } from '@/engines/renderer'
import './TacticalBoard.css'

interface TacticalBoardProps {
  matchState: MatchState
  onPlayerDragStart: (player: Player) => void
  onPlayerDrag: (player: Player, position: Position) => void
  onPlayerDragEnd: (player: Player) => void
  onPlayerClick: (player: Player) => void
  onBallClick: (position: Position) => void
}

const PLAYER_RADIUS = 12

export const TacticalBoard: React.FC<TacticalBoardProps> = ({
  matchState,
  onPlayerDragStart,
  onPlayerDrag,
  onPlayerDragEnd,
  onPlayerClick,
  onBallClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dims, setDims] = useState<CanvasDimensions | null>(null)
  const [draggingPlayer, setDraggingPlayer] = useState<Player | null>(null)
  const [allPlayers, setAllPlayers] = useState<Player[]>([])

  // Update all players list when teams change
  useEffect(() => {
    setAllPlayers([
      ...matchState.homeTeam.players,
      ...matchState.awayTeam.players,
    ])
  }, [matchState.homeTeam.players, matchState.awayTeam.players])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement
        setDims(calculateCanvasDimensions(clientWidth, clientHeight))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Render canvas
  useEffect(() => {
    if (!canvasRef.current || !dims) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, dims.width, dims.height)

    // Draw pitch
    drawPitch(ctx, dims)

    // Draw all players
    matchState.homeTeam.players.forEach((player) => {
      const canvasPos = normalizedToCanvas(
        player.currentPosition.x,
        player.currentPosition.y,
        dims
      )
      drawPlayer(
        ctx,
        player,
        canvasPos.x - dims.padding,
        canvasPos.y - dims.padding,
        matchState.homeTeam.color,
        dims
      )
    })

    matchState.awayTeam.players.forEach((player) => {
      const canvasPos = normalizedToCanvas(
        player.currentPosition.x,
        player.currentPosition.y,
        dims
      )
      drawPlayer(
        ctx,
        player,
        canvasPos.x - dims.padding,
        canvasPos.y - dims.padding,
        matchState.awayTeam.color,
        dims
      )
    })

    // Draw ball
    const ballCanvasPos = normalizedToCanvas(
      matchState.ball.x,
      matchState.ball.y,
      dims
    )
    drawBall(
      ctx,
      ballCanvasPos.x - dims.padding,
      ballCanvasPos.y - dims.padding,
      dims
    )

    // Draw UI overlay
    drawUI(
      ctx,
      matchState.homeTeam.name,
      matchState.awayTeam.name,
      matchState.isPaused,
      dims
    )
  }, [matchState, dims])

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dims || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicking on a player
    for (const player of allPlayers) {
      const canvasPos = normalizedToCanvas(
        player.currentPosition.x,
        player.currentPosition.y,
        dims
      )
      if (pointInCircle(x, y, canvasPos.x, canvasPos.y, PLAYER_RADIUS + 5)) {
        setDraggingPlayer(player)
        onPlayerDragStart(player)
        return
      }
    }

    // Check if clicking on ball
    const ballCanvasPos = normalizedToCanvas(
      matchState.ball.x,
      matchState.ball.y,
      dims
    )
    if (pointInCircle(x, y, ballCanvasPos.x, ballCanvasPos.y, 10)) {
      const normalized = canvasToNormalized(x, y, dims)
      onBallClick(normalized)
    }
  }

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingPlayer || !dims || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const normalized = canvasToNormalized(x, y, dims)
    const clampedPosition = {
      x: clamp(normalized.x, 0, 1),
      y: clamp(normalized.y, 0, 1),
    }

    onPlayerDrag(draggingPlayer, clampedPosition)
  }

  // Handle mouse up
  const handleMouseUp = () => {
    if (draggingPlayer) {
      onPlayerDragEnd(draggingPlayer)
      setDraggingPlayer(null)
    }
  }

  return (
    <div className="tactical-board-container">
      <canvas
        ref={canvasRef}
        className="tactical-board-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}
