import React from 'react'
import './ControlPanel.css'

interface ControlPanelProps {
  isPaused: boolean
  onPlayPause: () => void
  onReset: () => void
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPaused,
  onPlayPause,
  onReset,
}) => {
  return (
    <div className="control-panel">
      <button
        className="control-button"
        onClick={onPlayPause}
        title={isPaused ? 'Play' : 'Pause'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
      <button className="control-button" onClick={onReset} title="Reset">
        ↻
      </button>
    </div>
  )
}
