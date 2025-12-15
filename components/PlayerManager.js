'use client'

import { useState } from 'react'

export default function PlayerManager({ players, onAddPlayer }) {
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = playerName.trim()

    if (!trimmedName) {
      setError('Player name cannot be empty')
      return
    }

    if (players.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('Player already exists')
      return
    }

    onAddPlayer(trimmedName)
    setPlayerName('')
    setError('')
  }

  return (
    <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 space-y-4">
      <h2 className="text-xl font-bold text-white dark:text-gray-100">Players</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value)
            setError('')
          }}
          placeholder="Enter player name"
          className="flex-1 px-4 py-2 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-md text-white dark:text-gray-100 placeholder-red-200 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          Add Player
        </button>
      </form>

      {error && <p className="text-red-300 dark:text-red-400 text-sm">{error}</p>}

      {players.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="px-4 py-2 bg-white/10 dark:bg-gray-700/50 backdrop-blur-md rounded-lg text-white dark:text-gray-100 text-center"
            >
              {player.name}
            </div>
          ))}
        </div>
      )}

      {players.length === 0 && (
        <p className="text-red-200 dark:text-gray-400 text-sm">No players added yet</p>
      )}
    </div>
  )
}

