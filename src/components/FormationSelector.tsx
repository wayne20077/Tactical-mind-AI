import React from 'react'
import { FormationPreset } from '@/types'
import { listFormations } from '@/utils/formations'
import './FormationSelector.css'

interface FormationSelectorProps {
  currentFormation: string
  onFormationChange: (formation: FormationPreset) => void
}

export const FormationSelector: React.FC<FormationSelectorProps> = ({
  currentFormation,
  onFormationChange,
}) => {
  const formations = listFormations()

  return (
    <div className="formation-selector">
      <label htmlFor="formation-select">Formation:</label>
      <select
        id="formation-select"
        value={currentFormation}
        onChange={(e) => {
          const formation = formations.find((f) => f.name === e.target.value)
          if (formation) {
            onFormationChange(formation)
          }
        }}
        className="formation-select"
      >
        {formations.map((formation) => (
          <option key={formation.name} value={formation.name}>
            {formation.name} - {formation.description}
          </option>
        ))}
      </select>
    </div>
  )
}
