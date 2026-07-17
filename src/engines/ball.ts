/**
 * Ball physics and interactions
 */

import { Position } from '@/types'
import { PHYSICS, applyVelocity, applyFriction, clampVelocity, clampToField } from './physics'

/**
 * Ball state
 */
export interface BallState {
  position: Position
  velocity: Position
  isInPlay: boolean
}

/**
 * Create initial ball state
 */
export const createBallState = (position: Position = { x: 0.5, y: 0.5 }): BallState => ({
  position,
  velocity: { x: 0, y: 0 },
  isInPlay: true,
})

/**
 * Update ball physics
 */
export const updateBallPhysics = (ball: BallState): BallState => {
  // Apply friction
  let velocity = applyFriction(ball.velocity, PHYSICS.BALL_FRICTION)

  // Apply velocity to position
  let position = applyVelocity(ball.position, velocity)

  // Clamp to field bounds and apply bounce
  if (position.x < PHYSICS.BALL_RADIUS) {
    position.x = PHYSICS.BALL_RADIUS
    velocity.x *= -0.7 // Bounce with energy loss
  } else if (position.x > 1 - PHYSICS.BALL_RADIUS) {
    position.x = 1 - PHYSICS.BALL_RADIUS
    velocity.x *= -0.7
  }

  if (position.y < PHYSICS.BALL_RADIUS) {
    position.y = PHYSICS.BALL_RADIUS
    velocity.y *= -0.7
  } else if (position.y > 1 - PHYSICS.BALL_RADIUS) {
    position.y = 1 - PHYSICS.BALL_RADIUS
    velocity.y *= -0.7
  }

  // Clamp velocity
  velocity = clampVelocity(velocity, PHYSICS.BALL_MAX_VELOCITY)

  return {
    position,
    velocity,
    isInPlay: true,
  }
}

/**
 * Kick ball with force
 */
export const kickBall = (
  ball: BallState,
  direction: Position,
  power: number
): BallState => {
  const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
  if (magnitude === 0) return ball

  const normalized = {
    x: direction.x / magnitude,
    y: direction.y / magnitude,
  }

  const force = Math.min(power, 1.0) // Clamp power 0-1

  return {
    ...ball,
    velocity: {
      x: normalized.x * PHYSICS.BALL_MAX_VELOCITY * force,
      y: normalized.y * PHYSICS.BALL_MAX_VELOCITY * force,
    },
  }
}

/**
 * Check if ball is stationary
 */
export const isBallStationary = (ball: BallState, threshold: number = 0.0001): boolean => {
  const speed = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y)
  return speed < threshold
}

/**
 * Get ball speed
 */
export const getBallSpeed = (ball: BallState): number => {
  return Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y)
}
