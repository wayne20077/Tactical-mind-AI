/**
 * Match Engine
 *
 * Orchestrates all tactical systems and coordinates updates.
 * Single source of truth for match state.
 */

import { MatchState, Team } from '@/types'
import { TeamState, createTeamState, updateTeamObjective, calculateTeamCohesion, calculateIdentityAlignment } from './TeamEngine'
import { TacticalIdentity } from './TacticalIdentity'
import { GameState, createGameState, updateGameResult } from './GameState'

export interface MatchIntelligence {
  matchState: MatchState
  homeTeamIntelligence: TeamState
  awayTeamIntelligence: TeamState
  gameState: GameState
}

/**
 * Create match intelligence system
 */
export const createMatchIntelligence = (
  matchState: MatchState,
  homeTacticalIdentity: TacticalIdentity,
  awayTacticalIdentity: TacticalIdentity
): MatchIntelligence => {
  const gameState = createGameState()
  const homeTeamIntelligence = createTeamState(matchState.homeTeam, homeTacticalIdentity, true)
  const awayTeamIntelligence = createTeamState(matchState.awayTeam, awayTacticalIdentity, false)

  return {
    matchState,
    homeTeamIntelligence,
    awayTeamIntelligence,
    gameState,
  }
}

/**
 * Update match intelligence
 */
export const updateMatchIntelligence = (intelligence: MatchIntelligence): MatchIntelligence => {
  // Update game state
  const gameState: GameState = {
    ...intelligence.gameState,
    currentMinute: Math.floor(intelligence.matchState.timeSeconds / 60),
    result: updateGameResult(
      intelligence.matchState.homeTeam.score || 0,
      intelligence.matchState.awayTeam.score || 0,
      true
    ),
  }

  // Update team metrics
  let homeTeamIntelligence = { ...intelligence.homeTeamIntelligence }
  let awayTeamIntelligence = { ...intelligence.awayTeamIntelligence }

  // Calculate team cohesion
  homeTeamIntelligence.cohesion = calculateTeamCohesion(intelligence.matchState.homeTeam.players)
  awayTeamIntelligence.cohesion = calculateTeamCohesion(intelligence.matchState.awayTeam.players)

  // Update team objectives based on game state
  homeTeamIntelligence = updateTeamObjective(
    homeTeamIntelligence,
    gameState,
    `Home team objective updated - Result: ${gameState.result}`
  )
  awayTeamIntelligence = updateTeamObjective(
    awayTeamIntelligence,
    gameState,
    `Away team objective updated - Result: ${gameState.result}`
  )

  return {
    matchState: intelligence.matchState,
    homeTeamIntelligence,
    awayTeamIntelligence,
    gameState,
  }
}
