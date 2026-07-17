import { createPlayer, createTeam, updatePlayerPosition, setPlayerDragging, setPlayerSelected } from '@/utils/player'
import { TacticalPosition } from '@/types'

describe('Player Utilities', () => {
  describe('createPlayer', () => {
    it('should create a player with correct properties', () => {
      const player = createPlayer(
        'p1',
        1,
        'Test Player',
        'ST' as TacticalPosition,
        'team1',
        { x: 0.5, y: 0.5 }
      )

      expect(player.id).toBe('p1')
      expect(player.number).toBe(1)
      expect(player.name).toBe('Test Player')
      expect(player.position).toBe('ST')
      expect(player.isDragging).toBe(false)
      expect(player.isSelected).toBe(false)
    })
  })

  describe('createTeam', () => {
    it('should create a team with players', () => {
      const team = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')

      expect(team.id).toBe('home')
      expect(team.name).toBe('Argentina')
      expect(team.color).toBe('#3366ff')
      expect(team.players.length).toBe(11)
      expect(team.players[0].position).toBe('GK')
    })

    it('should throw error for unknown formation', () => {
      expect(() => {
        createTeam('home', 'Argentina', '#3366ff', '#ffffff', 'invalid-formation')
      }).toThrow('Unknown formation: invalid-formation')
    })
  })

  describe('updatePlayerPosition', () => {
    it('should update player position', () => {
      const player = createPlayer(
        'p1',
        1,
        'Test',
        'ST' as TacticalPosition,
        'team1',
        { x: 0.5, y: 0.5 }
      )

      const updated = updatePlayerPosition(player, { x: 0.7, y: 0.8 })

      expect(updated.currentPosition.x).toBe(0.7)
      expect(updated.currentPosition.y).toBe(0.8)
      expect(player.currentPosition.x).toBe(0.5) // Original unchanged
    })
  })

  describe('setPlayerDragging', () => {
    it('should set dragging state', () => {
      const player = createPlayer(
        'p1',
        1,
        'Test',
        'ST' as TacticalPosition,
        'team1',
        { x: 0.5, y: 0.5 }
      )

      const dragging = setPlayerDragging(player, true)

      expect(dragging.isDragging).toBe(true)
      expect(player.isDragging).toBe(false) // Original unchanged
    })
  })

  describe('setPlayerSelected', () => {
    it('should set selected state', () => {
      const player = createPlayer(
        'p1',
        1,
        'Test',
        'ST' as TacticalPosition,
        'team1',
        { x: 0.5, y: 0.5 }
      )

      const selected = setPlayerSelected(player, true)

      expect(selected.isSelected).toBe(true)
      expect(player.isSelected).toBe(false) // Original unchanged
    })
  })
})
