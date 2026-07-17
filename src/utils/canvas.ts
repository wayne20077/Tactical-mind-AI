import { CanvasDimensions } from '@/types'

/**
 * Calculate canvas dimensions based on container
 */
export const calculateCanvasDimensions = (
  containerWidth: number,
  containerHeight: number
): CanvasDimensions => {
  const padding = 40
  const width = containerWidth - padding * 2
  const height = containerHeight - padding * 2
  const pitchWidth = width
  const pitchHeight = height

  return {
    width: containerWidth,
    height: containerHeight,
    pitchWidth,
    pitchHeight,
    padding,
  }
}

/**
 * Convert normalized position (0-1) to canvas coordinates
 */
export const normalizedToCanvas = (
  x: number,
  y: number,
  dims: CanvasDimensions
) => {
  return {
    x: dims.padding + x * dims.pitchWidth,
    y: dims.padding + y * dims.pitchHeight,
  }
}

/**
 * Convert canvas coordinates to normalized position (0-1)
 */
export const canvasToNormalized = (
  x: number,
  y: number,
  dims: CanvasDimensions
) => {
  return {
    x: (x - dims.padding) / dims.pitchWidth,
    y: (y - dims.padding) / dims.pitchHeight,
  }
}

/**
 * Calculate distance between two positions
 */
export const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Check if point is within circle
 */
export const pointInCircle = (
  px: number,
  py: number,
  cx: number,
  cy: number,
  radius: number
): boolean => {
  return distance(px, py, cx, cy) <= radius
}

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}
