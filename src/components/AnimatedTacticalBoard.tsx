import React, { useEffect, useRef, useState } from 'react'
import { MatchState, Player, Position } from '@/types'
import { AnimationEngine, createAnimationEngine } from '@/engines/animation'
import { checkCollision, resolveCollision, PHYSICS } from '@/engines/physics'
import './AnimatedTacticalBoard.css'

interface AnimatedTacticalBoardProps {
  matchState: MatchState
  onMatchStateUpdate: (matchState: MatchState) => void
  onPlayerDragStart: (player: Player) => void
  onPlayerDrag: (player: Player, position: Position) => void
  onPlayerDragEnd: (player: Player) => void
}

const PLAYER_RADIUS = 12

export const AnimatedTacticalBoard: React.FC<AnimatedTacticalBoardProps> = ({
  matchState,
  onMatchStateUpdate,
  onPlayerDragStart,
  onPlayerDrag,
  onPlayerDragEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<AnimationEngine | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const [draggingPlayer, setDraggingPlayer] = useState<Player | null>(null)

  // Initialize animation engine
  useEffect(() => {
    if (!animationRef.current) {
      animationRef.current = createAnimationEngine()
    }

    if (!matchState.isPaused && animationRef.current) {
      animationRef.current.start()
    } else if (matchState.isPaused && animationRef.current) {
      animationRef.current.stop()
    }
  }, [matchState.isPaused])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!animationRef.current || !animationRef.current.getIsRunning()) {
        frameIdRef.current = requestAnimationFrame(animate)
        return
      }

      // Update physics for all players
      let updatedHomeTeam = matchState.homeTeam
      let updatedAwayTeam = matchState.awayTeam

      // Update player physics
      const homePlayersUpdated = animationRef.current.updatePlayersPhysics(
        matchState.homeTeam.players
      )
      const awayPlayersUpdated = animationRef.current.updatePlayersPhysics(
        matchState.awayTeam.players
      )

      // Check collisions between players
      const allPlayers = [...homePlayersUpdated, ...awayPlayersUpdated]
      for (let i = 0; i < allPlayers.length; i++) {
        for (let j = i + 1; j < allPlayers.length; j++) {
          if (
            checkCollision(
              allPlayers[i].currentPosition,
              allPlayers[j].currentPosition,
              PHYSICS.COLLISION_DISTANCE
            )
          ) {
            const resolved = resolveCollision(
              allPlayers[i].currentPosition,
              allPlayers[i].velocity,
              allPlayers[j].currentPosition,
              allPlayers[j].velocity
            )
            allPlayers[i].velocity = resolved.vel1
            allPlayers[j].velocity = resolved.vel2
          }
        }
      }

      updatedHomeTeam = {
        ...updatedHomeTeam,
        players: allPlayers.slice(0, updatedHomeTeam.players.length),
      }
      updatedAwayTeam = {
        ...updatedAwayTeam,
        players: allPlayers.slice(updatedHomeTeam.players.length),
      }

      // Update match state
      const newMatchState = {
        ...matchState,
        homeTeam: updatedHomeTeam,
        awayTeam: updatedAwayTeam,
      }

      onMatchStateUpdate(newMatchState)
      frameIdRef.current = requestAnimationFrame(animate)
    }

    frameIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [matchState, onMatchStateUpdate])

  // Handle canvas rendering
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    // Set canvas size
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw pitch (green background)
    ctx.fillStyle = '#1a4d2e'
    ctx.fillRect(20, 20, rect.width - 40, rect.height - 40)

    // Draw players
    const allPlayers = [
      ...matchState.homeTeam.players,
      ...matchState.awayTeam.players,
    ]
    allPlayers.forEach((player) => {
      const x = 20 + player.currentPosition.x * (rect.width - 40)
      const y = 20 + player.currentPosition.y * (rect.height - 40)

      const teamColor =
        matchState.homeTeam.players.includes(player)
          ? matchState.homeTeam.color
          : matchState.awayTeam.color

      // Draw player circle
      ctx.fillStyle = teamColor
      ctx.beginPath()
      ctx.arc(x, y, PLAYER_RADIUS, 0, Math.PI * 2)
      ctx.fill()

      // Draw player number
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(player.number.toString(), x, y)
    })
  }, [matchState])

  return (
    <div className="animated-tactical-board-container">
      <canvas ref={canvasRef} className="animated-tactical-board-canvas" />
    </div>
  )
}
