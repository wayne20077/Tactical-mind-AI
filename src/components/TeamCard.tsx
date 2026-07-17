import React, { useState, useEffect } from 'react'
import { Team } from '@/types'
import './TeamCard.css'

interface TeamCardProps {
  team: Team
  isHome: boolean
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, isHome }) => {
  return (
    <div className={`team-card ${isHome ? 'home' : 'away'}`}>
      <div className="team-header">
        <div
          className="team-color-indicator"
          style={{ backgroundColor: team.color }}
        />
        <h3 className="team-name">{team.name}</h3>
      </div>
      <div className="team-formation">{team.formation}</div>
      <div className="team-players">
        <div className="players-label">Players: {team.players.length}</div>
      </div>
    </div>
  )
}
