import { FormationPreset, TacticalPosition, Position } from '@/types'

/**
 * 4-3-3 Formation
 * Classic balanced formation
 */
export const formation_4_3_3: FormationPreset = {
  name: '4-3-3',
  formation: '4-3-3',
  description: 'Classic balanced formation with defensive stability',
  positions: {
    GK: { x: 0.5, y: 0.05 },
    LB: { x: 0.1, y: 0.25 },
    CB: { x: 0.25, y: 0.25 },
    CB: { x: 0.75, y: 0.25 },
    RB: { x: 0.9, y: 0.25 },
    CM: { x: 0.3, y: 0.5 },
    CM: { x: 0.5, y: 0.5 },
    CM: { x: 0.7, y: 0.5 },
    LW: { x: 0.15, y: 0.75 },
    ST: { x: 0.5, y: 0.85 },
    RW: { x: 0.85, y: 0.75 },
  } as Record<TacticalPosition, Position>,
}

/**
 * 4-2-3-1 Formation
 * Modern defensive formation
 */
export const formation_4_2_3_1: FormationPreset = {
  name: '4-2-3-1',
  formation: '4-2-3-1',
  description: 'Defensive formation with two holding midfielders',
  positions: {
    GK: { x: 0.5, y: 0.05 },
    LB: { x: 0.1, y: 0.25 },
    CB: { x: 0.25, y: 0.25 },
    CB: { x: 0.75, y: 0.25 },
    RB: { x: 0.9, y: 0.25 },
    CDM: { x: 0.35, y: 0.45 },
    CDM: { x: 0.65, y: 0.45 },
    CAM: { x: 0.25, y: 0.65 },
    CM: { x: 0.5, y: 0.65 },
    CAM: { x: 0.75, y: 0.65 },
    ST: { x: 0.5, y: 0.85 },
  } as Record<TacticalPosition, Position>,
}

/**
 * 3-5-2 Formation
 * Attacking formation with wing-backs
 */
export const formation_3_5_2: FormationPreset = {
  name: '3-5-2',
  formation: '3-5-2',
  description: 'Attacking formation with three center-backs and wing-backs',
  positions: {
    GK: { x: 0.5, y: 0.05 },
    CB: { x: 0.2, y: 0.25 },
    CB: { x: 0.5, y: 0.25 },
    CB: { x: 0.8, y: 0.25 },
    LWB: { x: 0.05, y: 0.5 },
    CM: { x: 0.3, y: 0.55 },
    CM: { x: 0.5, y: 0.5 },
    CM: { x: 0.7, y: 0.55 },
    RWB: { x: 0.95, y: 0.5 },
    ST: { x: 0.35, y: 0.8 },
    ST: { x: 0.65, y: 0.8 },
  } as Record<TacticalPosition, Position>,
}

/**
 * 5-3-2 Formation
 * Defensive formation
 */
export const formation_5_3_2: FormationPreset = {
  name: '5-3-2',
  formation: '5-3-2',
  description: 'Defensive formation with five defenders',
  positions: {
    GK: { x: 0.5, y: 0.05 },
    LB: { x: 0.05, y: 0.25 },
    CB: { x: 0.25, y: 0.25 },
    CB: { x: 0.5, y: 0.2 },
    CB: { x: 0.75, y: 0.25 },
    RB: { x: 0.95, y: 0.25 },
    CM: { x: 0.3, y: 0.5 },
    CM: { x: 0.5, y: 0.5 },
    CM: { x: 0.7, y: 0.5 },
    ST: { x: 0.35, y: 0.8 },
    ST: { x: 0.65, y: 0.8 },
  } as Record<TacticalPosition, Position>,
}

/**
 * All available formations
 */
export const FORMATIONS: Record<string, FormationPreset> = {
  '4-3-3': formation_4_3_3,
  '4-2-3-1': formation_4_2_3_1,
  '3-5-2': formation_3_5_2,
  '5-3-2': formation_5_3_2,
}

/**
 * Get formation by name
 */
export const getFormation = (name: string): FormationPreset | null => {
  return FORMATIONS[name] || null
}

/**
 * List all available formations
 */
export const listFormations = (): FormationPreset[] => {
  return Object.values(FORMATIONS)
}
