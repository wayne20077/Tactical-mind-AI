import { MatchState, Team } from '@/types'

/**
 * Create initial match state
 */
export const createMatchState = (homeTeam: Team, awayTeam: Team): MatchState => ({
  homeTeam,
  awayTeam,
  ball: { x: 0.5, y: 0.5 },
  possession: null,
  isPaused: true,
  timeSeconds: 0,
})

/**
 * Toggle match pause state
 */
export const toggleMatchPause = (state: MatchState): MatchState => ({
  ...state,
  isPaused: !state.isPaused,
})

/**
 * Reset match to initial state
 */
export const resetMatch = (state: MatchState): MatchState => ({
  ...state,
  ball: { x: 0.5, y: 0.5 },
  possession: null,
  isPaused: true,
  timeSeconds: 0,
})

/**
 * Update ball position
 */
export const updateBallPosition = (
  state: MatchState,
  x: number,
  y: number
): MatchState => ({
  ...state,
  ball: { x, y },
})
