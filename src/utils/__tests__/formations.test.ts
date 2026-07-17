import { getFormation, listFormations, FORMATIONS } from '@/utils/formations'

describe('Formations', () => {
  describe('FORMATIONS', () => {
    it('should have all expected formations', () => {
      expect(FORMATIONS['4-3-3']).toBeDefined()
      expect(FORMATIONS['4-2-3-1']).toBeDefined()
      expect(FORMATIONS['3-5-2']).toBeDefined()
      expect(FORMATIONS['5-3-2']).toBeDefined()
    })
  })

  describe('getFormation', () => {
    it('should return formation by name', () => {
      const formation = getFormation('4-3-3')

      expect(formation).toBeDefined()
      expect(formation?.name).toBe('4-3-3')
      expect(formation?.formation).toBe('4-3-3')
    })

    it('should return null for unknown formation', () => {
      const formation = getFormation('unknown')

      expect(formation).toBeNull()
    })
  })

  describe('listFormations', () => {
    it('should return array of all formations', () => {
      const formations = listFormations()

      expect(formations).toHaveLength(4)
      expect(formations[0].name).toBeDefined()
    })
  })

  describe('Formation positions', () => {
    it('4-3-3 should have all positions defined', () => {
      const formation = getFormation('4-3-3')

      expect(formation?.positions.GK).toBeDefined()
      expect(formation?.positions.CB).toBeDefined()
      expect(formation?.positions.CM).toBeDefined()
    })
  })
})
