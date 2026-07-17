/**
 * Player state machine for AI-driven behavior
 */

import { Player, Position } from '@/types'

/**
 * Player states
 */
export type PlayerState = 'idle' | 'moving' | 'defending' | 'attacking' | 'supporting'

/**
 * Player behavior configuration
 */
export interface PlayerBehavior {
  state: PlayerState
  targetPosition?: Position
  targetPlayer?: string
  priority: number
}

/**
 * State machine for player behavior
 */
export class PlayerStateMachine {
  private currentState: PlayerState = 'idle'
  private behavior: PlayerBehavior
  private stateChangeTimeout: number | null = null

  constructor() {
    this.behavior = {
      state: 'idle',
      priority: 0,
    }
  }

  /**
   * Get current state
   */
  getState(): PlayerState {
    return this.currentState
  }

  /**
   * Get current behavior
   */
  getBehavior(): PlayerBehavior {
    return this.behavior
  }

  /**
   * Transition to new state
   */
  transitionTo(newState: PlayerState, behavior?: Partial<PlayerBehavior>): void {
    this.currentState = newState
    this.behavior = {
      state: newState,
      priority: behavior?.priority ?? this.behavior.priority,
      targetPosition: behavior?.targetPosition ?? this.behavior.targetPosition,
      targetPlayer: behavior?.targetPlayer ?? this.behavior.targetPlayer,
    }
  }

  /**
   * Update state based on conditions
   */
  update(
    playerPosition: Position,
    ballPosition: Position,
    isPlayerNearBall: boolean
  ): void {
    switch (this.currentState) {
      case 'idle':
        // Transition to defending if far from ball
        if (!isPlayerNearBall) {
          this.transitionTo('defending', { priority: 1 })
        } else {
          this.transitionTo('attacking', { priority: 2 })
        }
        break

      case 'defending':
        // Transition to attacking if near ball
        if (isPlayerNearBall) {
          this.transitionTo('attacking', { priority: 3 })
        }
        break

      case 'attacking':
        // Transition back to defending if ball goes away
        if (!isPlayerNearBall) {
          this.transitionTo('defending', { priority: 1 })
        }
        break
    }
  }
}

/**
 * Create player state machine
 */
export const createPlayerStateMachine = (): PlayerStateMachine => {
  return new PlayerStateMachine()
}
