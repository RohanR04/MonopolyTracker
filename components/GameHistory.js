"use client";

import { MAPS } from "../lib/constants";
import { getDate } from "../utils/dateUtils";

export default function GameHistory({ games, onDeleteGame }) {
  if (games.length === 0) {
    return (
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4">
        <p className="text-red-200 dark:text-gray-400 text-sm">
          No games logged yet
        </p>
      </div>
    );
  }

  // Sort games by date descending (newest first)
  const sortedGames = [...games].sort(
    (a, b) => getDate(b.date) - getDate(a.date)
  );

  const formatDate = (dateValue) => {
    const date = getDate(dateValue);
    if (!date || date.getTime() === 0) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPremiumMap = (mapName, gameType) => {
    const maps = MAPS[gameType] || [];
    const map = maps.find((m) => m.name === mapName);
    return map?.premium || false;
  };

  return (
    <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 space-y-3">
      <h2 className="text-xl font-bold text-white dark:text-gray-100">
        Game History
      </h2>
      <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
        {sortedGames.map((game) => {
          // Handle both single winner and group wins
          const winners =
            game.winners &&
            Array.isArray(game.winners) &&
            game.winners.length > 0
              ? game.winners
              : game.winner
              ? [game.winner]
              : [];

          const otherPlayers = game.players.filter((p) => !winners.includes(p));

          return (
            <div
              key={game.id}
              className="bg-white/5 dark:bg-gray-700/50 rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {winners.length > 1 ? (
                      <>
                        <span className="text-yellow-400 dark:text-yellow-500 font-bold">
                          {winners.join(" & ")}
                        </span>
                        <span className="text-red-200 dark:text-gray-400">
                          won (Team)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-yellow-400 dark:text-yellow-500 font-bold">
                          {winners[0]}
                        </span>
                        <span className="text-red-200 dark:text-gray-400">
                          won
                        </span>
                      </>
                    )}
                  </div>
                  {otherPlayers.length > 0 && (
                    <div className="text-red-200 dark:text-gray-400 text-sm mb-1">
                      vs {otherPlayers.join(", ")}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white dark:text-gray-300">
                      {game.map}
                      {isPremiumMap(game.map, game.gameType) && (
                        <span className="text-yellow-400 dark:text-yellow-500 ml-1">
                          ★
                        </span>
                      )}
                    </span>
                    <span className="text-red-200 dark:text-gray-500">•</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        game.gameType === "online"
                          ? "bg-blue-600 dark:bg-blue-700 text-white"
                          : "bg-green-600 dark:bg-green-700 text-white"
                      }`}
                    >
                      {game.gameType.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-red-200 dark:text-gray-400 text-xs mt-1">
                    {formatDate(game.date)}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteGame(game.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-sm rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
