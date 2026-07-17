/**
 * AI Decision Engine
 *
 * Orchestrates all AI decision-making for a team.
 * Integrates player decisions, formation maintenance, and tactical awareness.
 */

import { Team, Player, Position } from '@/types'
import { TeamState } from '@/engines/intelligence/TeamEngine'
import { GameState } from '@/engines/intelligence/GameState'
import { DecisionContext, createDecisionContext } from '@/engines/intelligence/DecisionContext'
import { makePlayerDecision, PlayerDecision } from './PlayerDecisionMaker'
import { calculateFormationMaintenance, FormationMaintenance } from './FormationMaintainer'
import { getRoleBehavior, PlayerRole } from './PlayerRoles'

export interface PlayerAIState {
  player: Player
  decision: PlayerDecision
  role: PlayerRole
  formationMaintenance: FormationMaintenance
}

export interface TeamAIState {
  teamId: string
  players: PlayerAIState[]
  overallCohesion: number
  formationAlignment: number
}

/**
 * Calculate team AI decisions
 */
export const calculateTeamAIDecisions = (
  team: Team,
  teamState: TeamState,
  gameState: GameState,
  ballPosition: Position,
  opponents: Player[]
): TeamAIState => {
  const playerStates: PlayerAIState[] = []

  team.players.forEach((player) => {
    // Determine player role
    const role = determinePlayerRole(player)

    // Get nearby players
    const nearbyTeammates = getNearbyPlayers(player, team.players, 0.25)
    const nearbyOpponents = getNearbyPlayers(player, opponents, 0.25)

    // Create decision context
    const context = createDecisionContext(
      player,
      teamState.currentObjective,
      teamState.tacticalIdentity,
      gameState,
      nearbyTeammates,
      nearbyOpponents,
      ballPosition,
      {
        teamCohesion: teamState.cohesion,
        identityAlignment: teamState.identityAlignment,
      }
    )

    // Make tactical decision
    const decision = makePlayerDecision(player, context, role)

    // Get formation maintenance
    const formation = calculateFormationMaintenance([player], teamState.tacticalIdentity)[0]

    playerStates.push({
      player,
      decision,
      role,
      formationMaintenance: formation,
    })
  })

  // Calculate team-level metrics
  const formationMaintenance = calculateFormationMaintenance(team.players, teamState.tacticalIdentity)
  const inFormationCount = formationMaintenance.filter((m) => m.isInFormation).length
  const formationAlignment = (inFormationCount / team.players.length) * 100

  return {
    teamId: team.id,
    players: playerStates,
    overallCohesion: teamState.cohesion,
    formationAlignment,
  }
}

/**
 * Determine player role based on position
 */
const determinePlayerRole = (player: Player): PlayerRole => {
  switch (player.position) {
    case 'GK':
      return 'goalkeeper'
    case 'CB':
    case 'FB':
    case 'LB':
    case 'RB':
      return 'defender'
    case 'CM':
    case 'CDM':
    case 'CAM':
    case 'LM':
    case 'RM':
      return 'midfielder'
    case 'ST':
    case 'CF':
    case 'LW':
    case 'RW':
      return 'forward'
    default:
      return 'midfielder'
  }
}

/**
 * Get nearby players within radius
 */
const getNearbyPlayers = (
  player: Player,
  players: Player[],
  radius: number
): Player[] => {
  return players
    .filter((p) => p.id !== player.id)
    .filter((p) => {
      const dx = p.currentPosition.x - player.currentPosition.x
      const dy = p.currentPosition.y - player.currentPosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < radius
    })
    .sort((a, b) => {
      const distA = Math.sqrt(
        Math.pow(a.currentPosition.x - player.currentPosition.x, 2) +
          Math.pow(a.currentPosition.y - player.currentPosition.y, 2)
      )
      const distB = Math.sqrt(
        Math.pow(b.currentPosition.x - player.currentPosition.x, 2) +
          Math.pow(b.currentPosition.y - player.currentPosition.y, 2)
      )
      return distA - distB
    })
}
