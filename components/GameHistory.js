'use client'

import { MAPS } from '../lib/constants'
import { getDate } from '../utils/dateUtils'

export default function GameHistory({ games, onDeleteGame }) {
  if (games.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
        <p className="text-red-200 text-sm">No games logged yet</p>
      </div>
    )
  }

  // Sort games by date descending (newest first)
  const sortedGames = [...games].sort(
    (a, b) => getDate(b.date) - getDate(a.date)
  )

  const formatDate = (dateValue) => {
    const date = getDate(dateValue)
    if (!date || date.getTime() === 0) return 'Invalid date'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const isPremiumMap = (mapName, gameType) => {
    const maps = MAPS[gameType] || []
    const map = maps.find((m) => m.name === mapName)
    return map?.premium || false
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
      <h2 className="text-xl font-bold text-white">Game History</h2>
      <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
        {sortedGames.map((game) => {
          const otherPlayers = game.players.filter((p) => p !== game.winner)
          return (
            <div
              key={game.id}
              className="bg-white/5 rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 font-bold">
                      {game.winner}
                    </span>
                    <span className="text-red-200">won</span>
                  </div>
                  {otherPlayers.length > 0 && (
                    <div className="text-red-200 text-sm mb-1">
                      vs {otherPlayers.join(', ')}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white">
                      {game.map}
                      {isPremiumMap(game.map, game.gameType) && (
                        <span className="text-yellow-400 ml-1">★</span>
                      )}
                    </span>
                    <span className="text-red-200">•</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        game.gameType === 'online'
                          ? 'bg-blue-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {game.gameType.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-red-200 text-xs mt-1">
                    {formatDate(game.date)}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteGame(game.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

