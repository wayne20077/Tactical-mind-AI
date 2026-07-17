/**
 * Player Roles
 *
 * Each player has a role that determines their tactical behavior.
 * Roles define what decisions a player makes within their position.
 */

export type PlayerRole = 'goalkeeper' | 'defender' | 'midfielder' | 'forward'

export interface RoleBehavior {
  role: PlayerRole
  description: string
  responsibilities: string[]
  decisionPriorities: string[]
  movementStyle: 'aggressive' | 'balanced' | 'conservative'
}

export const ROLE_BEHAVIORS: Record<PlayerRole, RoleBehavior> = {
  goalkeeper: {
    role: 'goalkeeper',
    description: 'Last line of defense',
    responsibilities: [
      'Prevent shots on goal',
      'Organize defense',
      'Distribute ball',
      'Control penalty area',
    ],
    decisionPriorities: [
      'Shot stopping',
      'Distribution quality',
      'Sweeper duties',
      'Cross prevention',
    ],
    movementStyle: 'conservative',
  },
  defender: {
    role: 'defender',
    description: 'Defensive line player',
    responsibilities: [
      'Mark opponents',
      'Block shots',
      'Win aerial duels',
      'Prevent penetration',
      'Support buildup',
    ],
    decisionPriorities: [
      'Defensive positioning',
      'Marking priority',
      'Pass support',
      'Positioning recovery',
    ],
    movementStyle: 'conservative',
  },
  midfielder: {
    role: 'midfielder',
    description: 'Central play coordinator',
    responsibilities: [
      'Control midfield',
      'Create opportunities',
      'Support defense',
      'Progress possession',
      'Win possession',
    ],
    decisionPriorities: [
      'Positioning fluidity',
      'Passing lanes',
      'Pressing timing',
      'Space perception',
    ],
    movementStyle: 'balanced',
  },
  forward: {
    role: 'forward',
    description: 'Attacking line player',
    responsibilities: [
      'Create chances',
      'Finish opportunities',
      'Press opposition',
      'Hold up play',
      'Exploit space',
    ],
    decisionPriorities: [
      'Shooting opportunities',
      'Space exploitation',
      'Pressing triggers',
      'Movement timing',
    ],
    movementStyle: 'aggressive',
  },
}

/**
 * Get role behavior
 */
export const getRoleBehavior = (role: PlayerRole): RoleBehavior => {
  return ROLE_BEHAVIORS[role]
}
