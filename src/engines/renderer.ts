import { Player } from '@/types'
import { CanvasDimensions } from '@/types'

const PLAYER_RADIUS = 12
const LINE_WIDTH = 2
const GRID_COLOR = 'rgba(255, 255, 255, 0.1)'
const FIELD_COLOR = '#1a4d2e'
const HALF_LINE_COLOR = 'rgba(255, 255, 255, 0.3)'
const BALL_COLOR = '#ffffff'
const SELECTED_HIGHLIGHT = 'rgba(255, 215, 0, 0.5)'

/**
 * Draw the football pitch
 */
export const drawPitch = (
  ctx: CanvasRenderingContext2D,
  dims: CanvasDimensions
) => {
  const { padding, pitchWidth, pitchHeight } = dims

  // Field background
  ctx.fillStyle = FIELD_COLOR
  ctx.fillRect(padding, padding, pitchWidth, pitchHeight)

  // Field border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.lineWidth = LINE_WIDTH
  ctx.strokeRect(padding, padding, pitchWidth, pitchHeight)

  // Half line
  ctx.strokeStyle = HALF_LINE_COLOR
  ctx.beginPath()
  ctx.moveTo(padding + pitchWidth / 2, padding)
  ctx.lineTo(padding + pitchWidth / 2, padding + pitchHeight)
  ctx.stroke()

  // Center circle
  ctx.strokeStyle = HALF_LINE_COLOR
  ctx.beginPath()
  ctx.arc(
    padding + pitchWidth / 2,
    padding + pitchHeight / 2,
    pitchHeight / 6,
    0,
    Math.PI * 2
  )
  ctx.stroke()

  // Center spot
  ctx.fillStyle = HALF_LINE_COLOR
  ctx.beginPath()
  ctx.arc(
    padding + pitchWidth / 2,
    padding + pitchHeight / 2,
    3,
    0,
    Math.PI * 2
  )
  ctx.fill()
}

/**
 * Draw a player
 */
export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  x: number,
  y: number,
  color: string,
  dims: CanvasDimensions
) => {
  const { padding } = dims

  // Player circle
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(padding + x, padding + y, PLAYER_RADIUS, 0, Math.PI * 2)
  ctx.fill()

  // Selection highlight
  if (player.isSelected) {
    ctx.fillStyle = SELECTED_HIGHLIGHT
    ctx.beginPath()
    ctx.arc(padding + x, padding + y, PLAYER_RADIUS + 4, 0, Math.PI * 2)
    ctx.fill()
  }

  // Player number
  ctx.fillStyle = '#000000'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(player.number.toString(), padding + x, padding + y)
}

/**
 * Draw the ball
 */
export const drawBall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dims: CanvasDimensions
) => {
  const { padding } = dims
  const ballRadius = 6

  ctx.fillStyle = BALL_COLOR
  ctx.beginPath()
  ctx.arc(padding + x, padding + y, ballRadius, 0, Math.PI * 2)
  ctx.fill()

  // Ball shadow/depth
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(padding + x, padding + y, ballRadius, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * Draw UI text overlay
 */
export const drawUI = (
  ctx: CanvasRenderingContext2D,
  homeTeamName: string,
  awayTeamName: string,
  isPaused: boolean,
  dims: CanvasDimensions
) => {
  const { width } = dims

  // Team names
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = '14px Arial'
  ctx.textAlign = 'left'
  ctx.fillText(homeTeamName, 20, 25)

  ctx.textAlign = 'right'
  ctx.fillText(awayTeamName, width - 20, 25)

  // Pause indicator
  if (isPaused) {
    ctx.fillStyle = 'rgba(255, 215, 0, 0.7)'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('PAUSED', width / 2, 25)
  }
}
