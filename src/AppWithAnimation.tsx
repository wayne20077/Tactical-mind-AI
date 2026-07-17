import React, { useState, useCallback } from 'react'
import { MatchState, Player, Position, FormationPreset } from '@/types'
import { AnimatedTacticalBoard } from '@/components/AnimatedTacticalBoard'
import { FormationSelector } from '@/components/FormationSelector'
import { ControlPanel } from '@/components/ControlPanel'
import { TeamCard } from '@/components/TeamCard'
import { createMatchState, toggleMatchPause, resetMatch, updateBallPosition } from '@/utils/match'
import { createTeam } from '@/utils/player'
import './AppWithAnimation.css'

const AppWithAnimation: React.FC = () => {
  // Initialize teams
  const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
  const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')
  const [matchState, setMatchState] = useState<MatchState>(
    createMatchState(homeTeam, awayTeam)
  )

  // Handle match state update
  const handleMatchStateUpdate = useCallback((newMatchState: MatchState) => {
    setMatchState(newMatchState)
  }, [])

  // Handle formation change for home team
  const handleHomeFormationChange = useCallback((formation: FormationPreset) => {
    setMatchState((prev) => {
      const newHomeTeam = createTeam(
        'home',
        prev.homeTeam.name,
        prev.homeTeam.color,
        prev.homeTeam.textColor,
        formation.name
      )
      return {
        ...prev,
        homeTeam: newHomeTeam,
      }
    })
  }, [])

  // Handle formation change for away team
  const handleAwayFormationChange = useCallback((formation: FormationPreset) => {
    setMatchState((prev) => {
      const newAwayTeam = createTeam(
        'away',
        prev.awayTeam.name,
        prev.awayTeam.color,
        prev.awayTeam.textColor,
        formation.name
      )
      return {
        ...prev,
        awayTeam: newAwayTeam,
      }
    })
  }, [])

  // Handle player drag start
  const handlePlayerDragStart = useCallback((player: Player) => {
    console.log('Drag started:', player.name)
  }, [])

  // Handle player drag
  const handlePlayerDrag = useCallback((player: Player, position: Position) => {
    console.log('Dragging:', player.name, position)
  }, [])

  // Handle player drag end
  const handlePlayerDragEnd = useCallback((player: Player) => {
    console.log('Drag ended:', player.name)
  }, [])

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    setMatchState((prev) => toggleMatchPause(prev))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setMatchState((prev) => resetMatch(prev))
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">TacticalMind AI - Animated</h1>
        <p className="app-subtitle">Interactive Football Tactical Simulator with Physics</p>
      </header>

      <div className="app-container">
        <aside className="app-sidebar left-sidebar">
          <TeamCard team={matchState.homeTeam} isHome={true} />
          <FormationSelector
            currentFormation={matchState.homeTeam.formation}
            onFormationChange={handleHomeFormationChange}
          />
        </aside>

        <main className="app-main">
          <AnimatedTacticalBoard
            matchState={matchState}
            onMatchStateUpdate={handleMatchStateUpdate}
            onPlayerDragStart={handlePlayerDragStart}
            onPlayerDrag={handlePlayerDrag}
            onPlayerDragEnd={handlePlayerDragEnd}
          />
          <ControlPanel
            isPaused={matchState.isPaused}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
          />
        </main>

        <aside className="app-sidebar right-sidebar">
          <TeamCard team={matchState.awayTeam} isHome={false} />
          <FormationSelector
            currentFormation={matchState.awayTeam.formation}
            onFormationChange={handleAwayFormationChange}
          />
        </aside>
      </div>
    </div>
  )
}

export default AppWithAnimation
