import { createMatchState, toggleMatchPause, resetMatch } from '@/utils/match'
import { createTeam } from '@/utils/player'

describe('Match Utilities', () => {
  describe('createMatchState', () => {
    it('should create initial match state', () => {
      const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
      const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')

      const state = createMatchState(homeTeam, awayTeam)

      expect(state.homeTeam).toBe(homeTeam)
      expect(state.awayTeam).toBe(awayTeam)
      expect(state.ball).toEqual({ x: 0.5, y: 0.5 })
      expect(state.isPaused).toBe(true)
      expect(state.timeSeconds).toBe(0)
    })
  })

  describe('toggleMatchPause', () => {
    it('should toggle pause state', () => {
      const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
      const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')
      const state = createMatchState(homeTeam, awayTeam)

      const paused = toggleMatchPause(state)
      expect(paused.isPaused).toBe(false)

      const playing = toggleMatchPause(paused)
      expect(playing.isPaused).toBe(true)
    })
  })

  describe('resetMatch', () => {
    it('should reset match to initial state', () => {
      const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
      const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')
      const state = createMatchState(homeTeam, awayTeam)

      const modified = {
        ...state,
        ball: { x: 0.7, y: 0.8 },
        timeSeconds: 100,
        isPaused: false,
      }

      const reset = resetMatch(modified)

      expect(reset.ball).toEqual({ x: 0.5, y: 0.5 })
      expect(reset.timeSeconds).toBe(0)
      expect(reset.isPaused).toBe(true)
    })
  })
})
