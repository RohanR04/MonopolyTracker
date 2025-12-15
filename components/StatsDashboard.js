'use client'

import { getPlayerStats, getMapStats, getGameTypeStats } from '../utils/stats'
import Leaderboard from './Leaderboard'
import StreaksDisplay from './StreaksDisplay'

export default function StatsDashboard({ games, players }) {
  const playerStats = getPlayerStats(games, players)
  const mapStats = getMapStats(games)
  const gameTypeStats = getGameTypeStats(games)
  const totalGames = games.length

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4">
        <h2 className="text-xl font-bold text-white dark:text-gray-100 mb-4">Overall Statistics</h2>
        <div className="text-3xl font-bold text-white dark:text-gray-100 mb-2">{totalGames}</div>
        <div className="text-red-200 dark:text-gray-400">Total Games Played</div>
      </div>

      {/* Game Type Breakdown */}
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4">
        <h3 className="text-lg font-bold text-white dark:text-gray-100 mb-3">Game Type Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white dark:text-gray-300">Online</span>
            <span className="text-yellow-400 dark:text-yellow-500 font-medium">{gameTypeStats.online}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white dark:text-gray-300">IRL</span>
            <span className="text-yellow-400 dark:text-yellow-500 font-medium">{gameTypeStats.irl}</span>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard playerStats={playerStats} />

      {/* Streaks */}
      <StreaksDisplay playerStats={playerStats} />

      {/* Map Statistics */}
      {mapStats.length > 0 && (
        <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 space-y-3">
          <h3 className="text-lg font-bold text-white dark:text-gray-100">Map Statistics</h3>
          <div className="space-y-2">
            {mapStats.map((map) => (
              <div
                key={map.name}
                className="flex justify-between items-center p-2 bg-white/5 dark:bg-gray-700/50 rounded-lg"
              >
                <span className="text-white dark:text-gray-300">{map.name}</span>
                <span className="text-yellow-400 dark:text-yellow-500 font-medium">{map.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

