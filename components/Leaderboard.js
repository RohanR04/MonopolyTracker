'use client'

export default function Leaderboard({ playerStats }) {
  if (playerStats.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
        <p className="text-red-200 text-sm">No games played yet</p>
      </div>
    )
  }

  const getMedal = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return null
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
      <h3 className="text-lg font-bold text-white">Leaderboard</h3>
      <div className="space-y-2">
        {playerStats.map((player, index) => {
          const rank = index + 1
          const medal = getMedal(rank)
          return (
            <div
              key={player.name}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-white font-bold w-6">
                  {medal || rank}
                </span>
                <span className="text-white font-medium">{player.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-red-200">
                  {player.wins}W / {player.gamesPlayed}G
                </span>
                <span className="text-yellow-400 font-medium">
                  {player.winRate}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

