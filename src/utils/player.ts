import { Player, Team, TacticalPosition, Position } from '@/types'
import { getFormation } from './formations'

/**
 * Create a player
 */
export const createPlayer = (
  id: string,
  number: number,
  name: string,
  position: TacticalPosition,
  teamId: string,
  currentPosition: Position
): Player => ({
  id,
  number,
  name,
  position,
  teamId,
  currentPosition,
  isDragging: false,
  isSelected: false,
  velocity: { x: 0, y: 0 },
})

/**
 * Create a team
 */
export const createTeam = (
  id: string,
  name: string,
  color: string,
  textColor: string,
  formation: string
): Team => {
  const formationPreset = getFormation(formation)
  if (!formationPreset) {
    throw new Error(`Unknown formation: ${formation}`)
  }

  const players: Player[] = []
  let playerNumber = 1

  // Create goalkeeper
  players.push(
    createPlayer(
      `${id}-gk`,
      playerNumber++,
      'Goalkeeper',
      'GK',
      id,
      formationPreset.positions.GK
    )
  )

  // Create outfield players
  const positionLabels: TacticalPosition[] = [
    'CB',
    'CB',
    'LB',
    'RB',
    'CM',
    'CM',
    'CM',
    'LW',
    'RW',
    'ST',
  ]

  positionLabels.forEach((pos) => {
    const posKey = pos === 'LW' ? 'LW' : pos === 'RW' ? 'RW' : pos
    players.push(
      createPlayer(
        `${id}-${playerNumber}`,
        playerNumber++,
        `Player ${playerNumber - 1}`,
        pos,
        id,
        formationPreset.positions[posKey] || { x: 0.5, y: 0.5 }
      )
    )
  })

  return {
    id,
    name,
    color,
    textColor,
    players,
    formation,
  }
}

/**
 * Update player position
 */
export const updatePlayerPosition = (
  player: Player,
  newPosition: Position
): Player => ({
  ...player,
  currentPosition: newPosition,
})

/**
 * Update player drag state
 */
export const setPlayerDragging = (
  player: Player,
  isDragging: boolean
): Player => ({
  ...player,
  isDragging,
})

/**
 * Update player selection state
 */
export const setPlayerSelected = (
  player: Player,
  isSelected: boolean
): Player => ({
  ...player,
  isSelected,
})
