/**
 * Core type definitions for TacticalMind AI
 */

/**
 * Player position on the field
 */
export interface Position {
  x: number
  y: number
}

/**
 * Tactical position (formation slot)
 */
export type TacticalPosition =
  | 'GK'
  | 'LB'
  | 'CB'
  | 'RB'
  | 'LWB'
  | 'RWB'
  | 'CM'
  | 'CDM'
  | 'CAM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'RW'
  | 'ST'
  | 'CF'

/**
 * Player object
 */
export interface Player {
  id: string
  number: number
  name: string
  position: TacticalPosition
  teamId: string
  currentPosition: Position
  targetPosition?: Position
  isDragging: boolean
  isSelected: boolean
  velocity: Position
}

/**
 * Team configuration
 */
export interface Team {
  id: string
  name: string
  color: string
  textColor: string
  players: Player[]
  formation: string
}

/**
 * Match state
 */
export interface MatchState {
  homeTeam: Team
  awayTeam: Team
  ball: Position
  possession: 'home' | 'away' | null
  isPaused: boolean
  timeSeconds: number
}

/**
 * Formation preset
 */
export interface FormationPreset {
  name: string
  formation: string
  description: string
  positions: Record<TacticalPosition, Position>
}

/**
 * Canvas dimensions
 */
export interface CanvasDimensions {
  width: number
  height: number
  pitchWidth: number
  pitchHeight: number
  padding: number
}
