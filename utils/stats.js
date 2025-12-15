/**
 * Calculate statistics for all players
 * @param {Array} games - Array of game objects
 * @param {Array} players - Array of player objects
 * @returns {Array} Array of player stats objects
 */
export function getPlayerStats(games, players) {
  const playerStats = players.map((player) => {
    const playerGames = games.filter((game) =>
      game.players.includes(player.name)
    );
    const wins = games.filter((game) => game.winner === player.name).length;
    const gamesPlayed = playerGames.length;
    const winRate =
      gamesPlayed > 0 ? ((wins / gamesPlayed) * 100).toFixed(1) : 0;

    const streaks = calculateStreaks(games, player.name);

    return {
      name: player.name,
      wins,
      gamesPlayed,
      winRate: parseFloat(winRate),
      currentStreak: streaks.current,
      bestStreak: streaks.best,
    };
  });

  return playerStats.sort((a, b) => b.wins - a.wins);
}

import { getDate } from './dateUtils'

/**
 * Calculate current and best winning streaks for a player
 * @param {Array} games - Array of game objects
 * @param {string} playerName - Name of the player
 * @returns {Object} Object with current and best streak
 */
export function calculateStreaks(games, playerName) {
  // Get all games the player participated in, sorted by date descending (newest first)
  const playerGames = games
    .filter((game) => game.players.includes(playerName))
    .sort((a, b) => getDate(b.date) - getDate(a.date));

  // Calculate current streak from most recent game backwards
  let currentStreak = 0;
  for (const game of playerGames) {
    if (game.winner === playerName) {
      currentStreak++;
    } else {
      break; // Streak broken
    }
  }

  // Calculate best streak across all games (chronological order)
  const allPlayerGames = games
    .filter((game) => game.players.includes(playerName))
    .sort((a, b) => getDate(a.date) - getDate(b.date));

  let bestStreak = 0;
  let tempStreak = 0;

  for (const game of allPlayerGames) {
    if (game.winner === playerName) {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    current: currentStreak,
    best: bestStreak,
  };
}

/**
 * Get statistics for each map
 * @param {Array} games - Array of game objects
 * @returns {Array} Array of map stats objects sorted by count
 */
export function getMapStats(games) {
  const mapCounts = {};

  games.forEach((game) => {
    const mapName = game.map;
    mapCounts[mapName] = (mapCounts[mapName] || 0) + 1;
  });

  return Object.entries(mapCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get game type statistics (Online vs IRL)
 * @param {Array} games - Array of game objects
 * @returns {Object} Object with online and irl counts
 */
export function getGameTypeStats(games) {
  const stats = {
    online: 0,
    irl: 0,
  };

  games.forEach((game) => {
    if (game.gameType === 'online') {
      stats.online++;
    } else if (game.gameType === 'irl') {
      stats.irl++;
    }
  });

  return stats;
}

