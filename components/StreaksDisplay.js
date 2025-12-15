'use client'

export default function StreaksDisplay({ playerStats }) {
  if (playerStats.length === 0) {
    return null
  }

  return (
    <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 space-y-3">
      <h3 className="text-lg font-bold text-white dark:text-gray-100">Streaks</h3>
      <div className="grid grid-cols-2 gap-3">
        {playerStats.map((player) => (
          <div
            key={player.name}
            className={`p-3 rounded-lg ${
              player.currentStreak > 0
                ? 'bg-yellow-500/20 dark:bg-yellow-600/20 border-2 border-yellow-500 dark:border-yellow-600'
                : 'bg-white/5 dark:bg-gray-700/50'
            }`}
          >
            <div className="text-white dark:text-gray-300 font-medium mb-1">{player.name}</div>
            <div className="text-sm space-y-1">
              <div className="text-red-200 dark:text-gray-400">
                Current: <span className="text-white dark:text-gray-200 font-bold">{player.currentStreak}</span>
              </div>
              <div className="text-red-200 dark:text-gray-400">
                Best: <span className="text-white dark:text-gray-200 font-bold">{player.bestStreak}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

