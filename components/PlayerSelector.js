'use client'

export default function PlayerSelector({ players, selectedPlayers, onTogglePlayer }) {
  if (players.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
        <p className="text-red-200 text-sm">No players added yet. Add players first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-white font-medium">Select Players (min 2)</label>
      <div className="grid grid-cols-2 gap-2">
        {players.map((player) => {
          const isSelected = selectedPlayers.includes(player.name)
          return (
            <button
              key={player.id}
              type="button"
              onClick={() => onTogglePlayer(player.name)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isSelected
                  ? 'bg-green-600 text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              {player.name}
            </button>
          )
        })}
      </div>
      {selectedPlayers.length > 0 && (
        <p className="text-red-200 text-sm">
          {selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}

