'use client'

import { MAPS } from '../lib/constants'

export default function MapSelector({ gameType, selectedMap, onSelectMap }) {
  const maps = gameType ? MAPS[gameType] : []

  if (!gameType) {
    return (
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4">
        <p className="text-red-200 dark:text-gray-400 text-sm">Select game type first</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-white dark:text-gray-300 font-medium">Select Map</label>
      <div className="grid grid-cols-2 gap-2">
        {maps.map((map) => {
          const isSelected = selectedMap === map.name
          return (
            <button
              key={map.name}
              type="button"
              onClick={() => onSelectMap(map.name)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-blue-600 dark:bg-blue-700 text-white'
                  : 'bg-white/10 dark:bg-gray-700/50 backdrop-blur-md text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700'
              }`}
            >
              {map.name}
              {map.premium && <span className="text-yellow-400 dark:text-yellow-500">★</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

