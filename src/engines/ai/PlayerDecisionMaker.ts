/**
 * Player Decision Maker
 *
 * Uses DecisionContext to make tactical decisions.
 * Decisions emerge from tactical principles, not hard-coded scripts.
 */

import { Player, Position } from '@/types'
import { DecisionContext } from '@/engines/intelligence/DecisionContext'
import { PlayerRole } from './PlayerRoles'

export type Decision = 'move' | 'pass' | 'press' | 'cover' | 'support' | 'idle'

export interface PlayerDecision {
  decision: Decision
  targetPosition?: Position
  targetPlayer?: string
  confidence: number // 0-100
  reasoning: string // Explainability
}

/**
 * Make tactical decision for player
 */
export const makePlayerDecision = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  const { currentObjective, ballPosition, gameState, teamPossession } = context

  // Base decision on team objective
  switch (currentObjective.type) {
    case 'keep_possession':
      return decideForPossession(player, context, role)
    case 'counterpress':
      return decideForCounterpress(player, context, role)
    case 'recover_shape':
      return decideForRecoveryShape(player, context, role)
    case 'progress_through_centre':
      return decideForCentralProgress(player, context, role)
    case 'progress_wide':
      return decideForWideProgress(player, context, role)
    case 'attack_half_space':
      return decideForHalfSpaceAttack(player, context, role)
    default:
      return decideIdle(player, context)
  }
}

/**
 * Decision for possession objective
 */
const decideForPossession = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  if (!context.teamPossession) {
    return decideIdle(player, context)
  }

  // Find best passing option
  if (context.availablePassingLanes.length > 0) {
    const bestLane = context.availablePassingLanes[0]
    return {
      decision: 'pass',
      targetPosition: bestLane,
      confidence: context.spaceRating,
      reasoning: `Pass available - Possession objective with ${context.spaceRating}% space quality`,
    }
  }

  // Move to support position
  return {
    decision: 'move',
    targetPosition: findSupportPosition(player, context),
    confidence: 75,
    reasoning: 'Moving to support possession chain',
  }
}

/**
 * Decision for counterpress
 */
const decideForCounterpress = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  if (context.teamPossession) {
    return decideIdle(player, context)
  }

  // Find nearest opponent with ball
  const nearestOpponent = context.nearbyOpponents[0]
  if (nearestOpponent && context.pressureLevel > 50) {
    return {
      decision: 'press',
      targetPlayer: nearestOpponent.id,
      confidence: 85,
      reasoning: `Counterpress - Nearest opponent ${context.pressureLevel}% pressure`,
    }
  }

  return decideForRecoveryShape(player, context, role)
}

/**
 * Decision for recovery shape
 */
const decideForRecoveryShape = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  // Move to defensive position
  const defensivePos = getDefensivePosition(player, context)

  return {
    decision: 'move',
    targetPosition: defensivePos,
    confidence: 80,
    reasoning: `Recovering defensive shape - Team cohesion ${context.teamCohesion}%`,
  }
}

/**
 * Decision for central progress
 */
const decideForCentralProgress = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  if (!context.teamPossession) {
    return decideForRecoveryShape(player, context, role)
  }

  // Progress centrally
  const progressPos = {
    x: Math.min(1, player.currentPosition.x + 0.1),
    y: 0.5,
  }

  return {
    decision: 'move',
    targetPosition: progressPos,
    confidence: 70,
    reasoning: 'Progressing through central lane',
  }
}

/**
 * Decision for wide progress
 */
const decideForWideProgress = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  if (!context.teamPossession) {
    return decideForRecoveryShape(player, context, role)
  }

  // Determine which flank to exploit
  const flank = player.currentPosition.y > 0.5 ? 'left' : 'right'
  const progressPos = {
    x: Math.min(1, player.currentPosition.x + 0.08),
    y: flank === 'left' ? Math.max(0, player.currentPosition.y - 0.1) : Math.min(1, player.currentPosition.y + 0.1),
  }

  return {
    decision: 'move',
    targetPosition: progressPos,
    confidence: 70,
    reasoning: `Progressing down ${flank} flank`,
  }
}

/**
 * Decision for half-space attack
 */
const decideForHalfSpaceAttack = (
  player: Player,
  context: DecisionContext,
  role: PlayerRole
): PlayerDecision => {
  if (!context.teamPossession) {
    return decideForRecoveryShape(player, context, role)
  }

  // Move to half-space (between full-back and center-back)
  const halfSpacePos = {
    x: Math.min(1, player.currentPosition.x + 0.15),
    y: player.currentPosition.y > 0.5 ? 0.35 : 0.65,
  }

  return {
    decision: 'move',
    targetPosition: halfSpacePos,
    confidence: 75,
    reasoning: 'Attacking half-space - Exploiting defensive gaps',
  }
}

/**
 * Idle decision
 */
const decideIdle = (
  player: Player,
  context: DecisionContext
): PlayerDecision => ({
  decision: 'idle',
  confidence: 50,
  reasoning: 'No immediate tactical action required',
})

/**
 * Find support position for possession
 */
const findSupportPosition = (player: Player, context: DecisionContext): Position => {
  // Move closer to nearest teammate
  if (context.nearbyTeammates.length > 0) {
    const teammate = context.nearbyTeammates[0]
    return {
      x: (player.currentPosition.x + teammate.currentPosition.x) / 2,
      y: (player.currentPosition.y + teammate.currentPosition.y) / 2,
    }
  }

  return player.currentPosition
}

/**
 * Get defensive position
 */
const getDefensivePosition = (player: Player, context: DecisionContext): Position => {
  // Move back towards own goal
  return {
    x: Math.max(0.2, player.currentPosition.x - 0.15),
    y: player.currentPosition.y,
  }
}
