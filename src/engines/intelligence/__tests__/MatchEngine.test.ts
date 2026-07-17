import { createMatchIntelligence, updateMatchIntelligence } from '@/engines/intelligence/MatchEngine'
import { createMatchState } from '@/utils/match'
import { createTeam } from '@/utils/player'
import { createTacticalIdentity, getTacticalIdentity } from '@/engines/intelligence/TacticalIdentity'

describe('MatchEngine', () => {
  describe('createMatchIntelligence', () => {
    it('should create match intelligence system', () => {
      const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
      const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')
      const matchState = createMatchState(homeTeam, awayTeam)

      const homeTacticalIdentity = getTacticalIdentity('argentina')!
      const awayTacticalIdentity = getTacticalIdentity('spain')!

      const intelligence = createMatchIntelligence(matchState, homeTacticalIdentity, awayTacticalIdentity)

      expect(intelligence.matchState).toBeDefined()
      expect(intelligence.homeTeamIntelligence).toBeDefined()
      expect(intelligence.awayTeamIntelligence).toBeDefined()
      expect(intelligence.gameState).toBeDefined()
    })
  })

  describe('updateMatchIntelligence', () => {
    it('should update match intelligence metrics', () => {
      const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
      const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')
      const matchState = createMatchState(homeTeam, awayTeam)

      const homeTacticalIdentity = getTacticalIdentity('argentina')!
      const awayTacticalIdentity = getTacticalIdentity('spain')!

      let intelligence = createMatchIntelligence(matchState, homeTacticalIdentity, awayTacticalIdentity)
      const before = intelligence.homeTeamIntelligence.cohesion

      intelligence = updateMatchIntelligence(intelligence)

      expect(intelligence.homeTeamIntelligence.cohesion).toBeDefined()
      expect(intelligence.awayTeamIntelligence.cohesion).toBeDefined()
    })
  })
})
