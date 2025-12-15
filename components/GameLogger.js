'use client'

import { useState } from 'react'
import PlayerSelector from './PlayerSelector'
import MapSelector from './MapSelector'

export default function GameLogger({ players, onLogGame }) {
  const [gameType, setGameType] = useState(null)
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [selectedMap, setSelectedMap] = useState(null)
  const [selectedWinner, setSelectedWinner] = useState('')
  const [error, setError] = useState('')

  const handleTogglePlayer = (playerName) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(playerName)) {
        const newSelection = prev.filter((p) => p !== playerName)
        if (selectedWinner === playerName) {
          setSelectedWinner('')
        }
        return newSelection
      } else {
        return [...prev, playerName]
      }
    })
    setError('')
  }

  const handleLogGame = () => {
    // Validation
    if (!gameType) {
      setError('Please select a game type')
      return
    }

    if (selectedPlayers.length < 2) {
      setError('Please select at least 2 players')
      return
    }

    if (!selectedMap) {
      setError('Please select a map')
      return
    }

    if (!selectedWinner) {
      setError('Please select a winner')
      return
    }

    if (!selectedPlayers.includes(selectedWinner)) {
      setError('Winner must be one of the selected players')
      return
    }

    // Log the game
    onLogGame({
      date: new Date().toISOString(),
      players: selectedPlayers,
      winner: selectedWinner,
      map: selectedMap,
      gameType: gameType,
    })

    // Reset form
    setGameType(null)
    setSelectedPlayers([])
    setSelectedMap(null)
    setSelectedWinner('')
    setError('')
  }

  const availableWinners = selectedPlayers.filter((name) =>
    players.some((p) => p.name === name)
  )

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-6">
      <h2 className="text-xl font-bold text-white">Log Game</h2>

      {/* Game Type Toggle */}
      <div className="space-y-2">
        <label className="block text-white font-medium">Game Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setGameType('online')
              setSelectedMap(null)
              setError('')
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              gameType === 'online'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
            }`}
          >
            Online
          </button>
          <button
            type="button"
            onClick={() => {
              setGameType('irl')
              setSelectedMap(null)
              setError('')
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              gameType === 'irl'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
            }`}
          >
            IRL
          </button>
        </div>
      </div>

      {/* Map Selector */}
      <MapSelector
        gameType={gameType}
        selectedMap={selectedMap}
        onSelectMap={(map) => {
          setSelectedMap(map)
          setError('')
        }}
      />

      {/* Player Selector */}
      <PlayerSelector
        players={players}
        selectedPlayers={selectedPlayers}
        onTogglePlayer={handleTogglePlayer}
      />

      {/* Winner Selection */}
      {selectedPlayers.length >= 2 && (
        <div className="space-y-2">
          <label className="block text-white font-medium">Winner</label>
          <select
            value={selectedWinner}
            onChange={(e) => {
              setSelectedWinner(e.target.value)
              setError('')
            }}
            className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select winner...</option>
            {availableWinners.map((name) => (
              <option key={name} value={name} className="bg-gray-800">
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-300 text-sm">{error}</p>}

      {/* Log Game Button */}
      <button
        onClick={handleLogGame}
        className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
      >
        Log Game
      </button>
    </div>
  )
}

