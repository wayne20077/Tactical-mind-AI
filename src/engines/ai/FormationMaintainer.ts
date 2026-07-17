/**
 * Formation Maintainer
 *
 * Ensures team maintains formation during play.
 * Players return to formation positions based on tactical objectives.
 */

import { Team, Player, Position } from '@/types'
import { TacticalIdentity } from '@/engines/intelligence/TacticalIdentity'

export interface FormationMaintenance {
  player: Player
  targetFormationPosition: Position
  distance: number
  isInFormation: boolean
}

/**
 * Calculate formation maintenance for all players
 */
export const calculateFormationMaintenance = (
  team: Team,
  identity: TacticalIdentity
): FormationMaintenance[] => {
  return team.players.map((player) => {
    // Get the formation position for this player's role
    const formationPosition = getFormationPositionForPlayer(player, team, identity)

    // Calculate distance from formation
    const dx = player.currentPosition.x - formationPosition.x
    const dy = player.currentPosition.y - formationPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // In formation if within tolerance
    const inFormation = distance < 0.08

    return {
      player,
      targetFormationPosition: formationPosition,
      distance,
      isInFormation: inFormation,
    }
  })
}

/**
 * Get formation position for player
 */
const getFormationPositionForPlayer = (
  player: Player,
  team: Team,
  identity: TacticalIdentity
): Position => {
  // Get formation preset positions
  const formationPositions = team.formation
    ? (team.formation as any)[player.position]
    : undefined

  if (!formationPositions || formationPositions.length === 0) {
    return player.currentPosition
  }

  // Find position for this player's number
  const playerIndex = team.players.indexOf(player)
  const positionInRole = playerIndex % formationPositions.length

  let basePosition = formationPositions[positionInRole]

  // Apply identity-based adjustments
  const adjustedPosition = {
    x: Math.max(0.1, Math.min(0.9, basePosition.x + (identity.compactness - 75) * 0.002)),
    y: basePosition.y + ((identity.width - 70) * 0.002 * Math.sign(basePosition.y - 0.5)),
  }

  return adjustedPosition
}

/**
 * Calculate overall formation alignment
 */
export const calculateFormationAlignment = (
  maintenance: FormationMaintenance[]
): number => {
  if (maintenance.length === 0) return 0

  const inFormationCount = maintenance.filter((m) => m.isInFormation).length
  return (inFormationCount / maintenance.length) * 100
}
