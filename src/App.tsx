import React, { useState, useCallback } from 'react'
import { MatchState, Player, Position, FormationPreset } from '@/types'
import { TacticalBoard } from '@/components/TacticalBoard'
import { FormationSelector } from '@/components/FormationSelector'
import { ControlPanel } from '@/components/ControlPanel'
import { TeamCard } from '@/components/TeamCard'
import { createMatchState, toggleMatchPause, resetMatch, updateBallPosition } from '@/utils/match'
import { createTeam } from '@/utils/player'
import { getFormation } from '@/utils/formations'
import './App.css'

const App: React.FC = () => {
  // Initialize teams
  const homeTeam = createTeam('home', 'Argentina', '#3366ff', '#ffffff', '4-3-3')
  const awayTeam = createTeam('away', 'Spain', '#ff6600', '#ffffff', '4-3-3')
  const [matchState, setMatchState] = useState<MatchState>(
    createMatchState(homeTeam, awayTeam)
  )

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
    setMatchState((prev) => {
      const updatePlayer = (p: Player) =>
        p.id === player.id ? { ...p, isDragging: true } : p
      return {
        ...prev,
        homeTeam: {
          ...prev.homeTeam,
          players: prev.homeTeam.players.map(updatePlayer),
        },
        awayTeam: {
          ...prev.awayTeam,
          players: prev.awayTeam.players.map(updatePlayer),
        },
      }
    })
  }, [])

  // Handle player drag
  const handlePlayerDrag = useCallback(
    (player: Player, position: Position) => {
      setMatchState((prev) => {
        const updatePlayer = (p: Player) =>
          p.id === player.id
            ? { ...p, currentPosition: position, isDragging: true }
            : p
        return {
          ...prev,
          homeTeam: {
            ...prev.homeTeam,
            players: prev.homeTeam.players.map(updatePlayer),
          },
          awayTeam: {
            ...prev.awayTeam,
            players: prev.awayTeam.players.map(updatePlayer),
          },
        }
      })
    },
    []
  )

  // Handle player drag end
  const handlePlayerDragEnd = useCallback((player: Player) => {
    setMatchState((prev) => {
      const updatePlayer = (p: Player) =>
        p.id === player.id ? { ...p, isDragging: false } : p
      return {
        ...prev,
        homeTeam: {
          ...prev.homeTeam,
          players: prev.homeTeam.players.map(updatePlayer),
        },
        awayTeam: {
          ...prev.awayTeam,
          players: prev.awayTeam.players.map(updatePlayer),
        },
      }
    })
  }, [])

  // Handle player click
  const handlePlayerClick = useCallback((player: Player) => {
    console.log('Player clicked:', player.name)
  }, [])

  // Handle ball click
  const handleBallClick = useCallback((position: Position) => {
    setMatchState((prev) => updateBallPosition(prev, position.x, position.y))
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
        <h1 className="app-title">TacticalMind AI</h1>
        <p className="app-subtitle">Interactive Football Tactical Simulator</p>
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
          <TacticalBoard
            matchState={matchState}
            onPlayerDragStart={handlePlayerDragStart}
            onPlayerDrag={handlePlayerDrag}
            onPlayerDragEnd={handlePlayerDragEnd}
            onPlayerClick={handlePlayerClick}
            onBallClick={handleBallClick}
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

export default App
