import { createBallState, updateBallPhysics, kickBall, isBallStationary, getBallSpeed } from '@/engines/ball'

describe('Ball Physics', () => {
  describe('createBallState', () => {
    it('should create ball with default position', () => {
      const ball = createBallState()
      expect(ball.position.x).toBe(0.5)
      expect(ball.position.y).toBe(0.5)
      expect(ball.velocity.x).toBe(0)
      expect(ball.velocity.y).toBe(0)
      expect(ball.isInPlay).toBe(true)
    })

    it('should create ball with custom position', () => {
      const ball = createBallState({ x: 0.3, y: 0.7 })
      expect(ball.position.x).toBe(0.3)
      expect(ball.position.y).toBe(0.7)
    })
  })

  describe('updateBallPhysics', () => {
    it('should apply friction to ball velocity', () => {
      const ball = createBallState()
      ball.velocity = { x: 0.01, y: 0.01 }
      const updated = updateBallPhysics(ball)
      expect(updated.velocity.x).toBeLessThan(0.01)
      expect(updated.velocity.y).toBeLessThan(0.01)
    })

    it('should handle wall bounces', () => {
      const ball = createBallState({ x: 0.99, y: 0.5 })
      ball.velocity = { x: 0.02, y: 0 }
      const updated = updateBallPhysics(ball)
      expect(updated.position.x).toBeLessThanOrEqual(1)
      expect(updated.velocity.x).toBeLessThan(0)
    })
  })

  describe('kickBall', () => {
    it('should apply force to ball', () => {
      const ball = createBallState()
      const kicked = kickBall(ball, { x: 1, y: 0 }, 0.8)
      expect(kicked.velocity.x).toBeGreaterThan(0)
      expect(kicked.velocity.y).toBe(0)
    })

    it('should clamp power to 0-1 range', () => {
      const ball = createBallState()
      const kicked = kickBall(ball, { x: 1, y: 0 }, 2.0)
      const speed = Math.sqrt(kicked.velocity.x ** 2 + kicked.velocity.y ** 2)
      expect(speed).toBeLessThanOrEqual(0.02)
    })
  })

  describe('isBallStationary', () => {
    it('should detect stationary ball', () => {
      const ball = createBallState()
      expect(isBallStationary(ball)).toBe(true)
    })

    it('should detect moving ball', () => {
      const ball = createBallState()
      ball.velocity = { x: 0.01, y: 0 }
      expect(isBallStationary(ball)).toBe(false)
    })
  })

  describe('getBallSpeed', () => {
    it('should calculate ball speed', () => {
      const ball = createBallState()
      ball.velocity = { x: 3, y: 4 }
      const speed = getBallSpeed(ball)
      expect(speed).toBe(5)
    })
  })
})
