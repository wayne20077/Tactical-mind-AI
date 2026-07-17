import { distance, pointInCircle, clamp, canvasToNormalized, normalizedToCanvas, calculateCanvasDimensions } from '@/utils/canvas'

describe('Canvas Utilities', () => {
  describe('distance', () => {
    it('should calculate distance between two points', () => {
      const result = distance(0, 0, 3, 4)
      expect(result).toBe(5)
    })

    it('should return 0 for same point', () => {
      const result = distance(5, 5, 5, 5)
      expect(result).toBe(0)
    })
  })

  describe('pointInCircle', () => {
    it('should return true for point inside circle', () => {
      const result = pointInCircle(0, 0, 0, 0, 10)
      expect(result).toBe(true)
    })

    it('should return false for point outside circle', () => {
      const result = pointInCircle(20, 20, 0, 0, 10)
      expect(result).toBe(false)
    })

    it('should return true for point on circle boundary', () => {
      const result = pointInCircle(5, 0, 0, 0, 5)
      expect(result).toBe(true)
    })
  })

  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('should return min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('should return max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('calculateCanvasDimensions', () => {
    it('should calculate dimensions correctly', () => {
      const dims = calculateCanvasDimensions(1000, 600)
      expect(dims.width).toBe(1000)
      expect(dims.height).toBe(600)
      expect(dims.padding).toBe(40)
      expect(dims.pitchWidth).toBe(920)
      expect(dims.pitchHeight).toBe(520)
    })
  })

  describe('coordinate conversion', () => {
    it('should convert normalized to canvas and back', () => {
      const dims = calculateCanvasDimensions(1000, 600)
      const normalized = { x: 0.5, y: 0.5 }

      const canvas = normalizedToCanvas(normalized.x, normalized.y, dims)
      const backToNormalized = canvasToNormalized(
        canvas.x,
        canvas.y,
        dims
      )

      expect(backToNormalized.x).toBeCloseTo(normalized.x, 5)
      expect(backToNormalized.y).toBeCloseTo(normalized.y, 5)
    })
  })
})
