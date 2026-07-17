import { analyzeSpace, findBestPassingLane } from '@/engines/intelligence/SpaceAnalysis'
import { createPlayer } from '@/utils/player'
import { TacticalPosition } from '@/types'

describe('SpaceAnalysis', () => {
  describe('analyzeSpace', () => {
    it('should analyze space around player', () => {
      const playerPos = { x: 0.5, y: 0.5 }
      const teammate = createPlayer(
        'p2',
        2,
        'Teammate',
        'CM' as TacticalPosition,
        'home',
        { x: 0.55, y: 0.5 }
      )
      const opponent = createPlayer(
        'p3',
        1,
        'Opponent',
        'CB' as TacticalPosition,
        'away',
        { x: 0.4, y: 0.5 }
      )

      const analysis = analyzeSpace(playerPos, [teammate], [opponent], playerPos)

      expect(analysis.availableSpace).toBeDefined()
      expect(analysis.passingLanes).toBeDefined()
      expect(analysis.dangerAreas).toBeDefined()
      expect(analysis.pressureIntensity).toBeGreaterThanOrEqual(0)
      expect(analysis.spaceQuality).toBeGreaterThanOrEqual(0)
    })

    it('should identify danger areas near opponents', () => {
      const playerPos = { x: 0.5, y: 0.5 }
      const opponent = createPlayer(
        'p1',
        1,
        'Opponent',
        'CB' as TacticalPosition,
        'away',
        { x: 0.5, y: 0.5 }
      )

      const analysis = analyzeSpace(playerPos, [], [opponent], playerPos)

      expect(analysis.dangerAreas.length).toBeGreaterThan(0)
    })
  })

  describe('findBestPassingLane', () => {
    it('should find best passing lane to teammate', () => {
      const playerPos = { x: 0.5, y: 0.5 }
      const teammate = createPlayer(
        'p2',
        2,
        'Teammate',
        'CM' as TacticalPosition,
        'home',
        { x: 0.7, y: 0.5 }
      )

      const lane = findBestPassingLane(playerPos, [teammate], [])

      expect(lane).toBeDefined()
      expect(lane?.x).toBe(0.7)
    })

    it('should return null when no teammates available', () => {
      const playerPos = { x: 0.5, y: 0.5 }
      const lane = findBestPassingLane(playerPos, [], [])
      expect(lane).toBeNull()
    })
  })
})
