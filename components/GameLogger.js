"use client";

import { useState } from "react";
import PlayerSelector from "./PlayerSelector";
import MapSelector from "./MapSelector";

export default function GameLogger({ players, onLogGame }) {
  const [gameType, setGameType] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState(""); // For online games
  const [selectedWinners, setSelectedWinners] = useState([]); // For IRL group wins
  const [error, setError] = useState("");

  const handleTogglePlayer = (playerName) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(playerName)) {
        const newSelection = prev.filter((p) => p !== playerName);
        // Remove from winners if deselected
        if (selectedWinner === playerName) {
          setSelectedWinner("");
        }
        if (selectedWinners.includes(playerName)) {
          setSelectedWinners((prev) => prev.filter((p) => p !== playerName));
        }
        return newSelection;
      } else {
        return [...prev, playerName];
      }
    });
    setError("");
  };

  const handleToggleWinner = (playerName) => {
    if (selectedWinners.includes(playerName)) {
      setSelectedWinners((prev) => prev.filter((p) => p !== playerName));
    } else {
      if (selectedWinners.length < 3) {
        setSelectedWinners((prev) => [...prev, playerName]);
      } else {
        setError("Maximum 3 winners allowed for group wins");
      }
    }
    setError("");
  };

  const handleLogGame = () => {
    // Validation
    if (!gameType) {
      setError("Please select a game type");
      return;
    }

    if (selectedPlayers.length < 2) {
      setError("Please select at least 2 players");
      return;
    }

    if (!selectedMap) {
      setError("Please select a map");
      return;
    }

    // Different validation for online vs IRL
    if (gameType === "online") {
      if (!selectedWinner) {
        setError("Please select a winner");
        return;
      }
      if (!selectedPlayers.includes(selectedWinner)) {
        setError("Winner must be one of the selected players");
        return;
      }
    } else if (gameType === "irl") {
      if (selectedWinners.length === 0) {
        setError("Please select at least 1 winner");
        return;
      }
      if (selectedWinners.length > 3) {
        setError("Maximum 3 winners allowed for group wins");
        return;
      }
      // Check all winners are in selected players
      const invalidWinners = selectedWinners.filter(
        (w) => !selectedPlayers.includes(w)
      );
      if (invalidWinners.length > 0) {
        setError("All winners must be selected players");
        return;
      }
    }

    // Log the game
    const gameData = {
      date: new Date().toISOString(),
      players: selectedPlayers,
      map: selectedMap,
      gameType: gameType,
    };

    if (gameType === "online") {
      gameData.winner = selectedWinner;
    } else {
      // IRL games: use winners array if multiple, winner if single
      if (selectedWinners.length === 1) {
        gameData.winner = selectedWinners[0];
      } else {
        gameData.winners = selectedWinners;
      }
    }

    onLogGame(gameData);

    // Reset form
    setGameType(null);
    setSelectedPlayers([]);
    setSelectedMap(null);
    setSelectedWinner("");
    setSelectedWinners([]);
    setError("");
  };

  const availableWinners = selectedPlayers.filter((name) =>
    players.some((p) => p.name === name)
  );

  return (
    <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 space-y-6">
      <h2 className="text-xl font-bold text-white dark:text-gray-100">
        Log Game
      </h2>

      {/* Game Type Toggle */}
      <div className="space-y-2">
        <label className="block text-white dark:text-gray-300 font-medium">
          Game Type
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setGameType("online");
              setSelectedMap(null);
              setSelectedWinner("");
              setSelectedWinners([]);
              setError("");
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              gameType === "online"
                ? "bg-blue-600 dark:bg-blue-700 text-white"
                : "bg-white/10 dark:bg-gray-700/50 backdrop-blur-md text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700"
            }`}
          >
            Online
          </button>
          <button
            type="button"
            onClick={() => {
              setGameType("irl");
              setSelectedMap(null);
              setSelectedWinner("");
              setSelectedWinners([]);
              setError("");
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              gameType === "irl"
                ? "bg-blue-600 dark:bg-blue-700 text-white"
                : "bg-white/10 dark:bg-gray-700/50 backdrop-blur-md text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700"
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
          setSelectedMap(map);
          setError("");
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
          {gameType === "online" ? (
            <>
              <label className="block text-white dark:text-gray-300 font-medium">
                Winner
              </label>
              <select
                value={selectedWinner}
                onChange={(e) => {
                  setSelectedWinner(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-md text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
              >
                <option value="">Select winner...</option>
                {availableWinners.map((name) => (
                  <option
                    key={name}
                    value={name}
                    className="bg-gray-800 dark:bg-gray-900"
                  >
                    {name}
                  </option>
                ))}
              </select>
            </>
          ) : gameType === "irl" ? (
            <>
              <label className="block text-white dark:text-gray-300 font-medium">
                Winner{selectedWinners.length > 1 ? "s" : ""} (Group Win - Max
                3)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableWinners.map((name) => {
                  const isSelected = selectedWinners.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleToggleWinner(name)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isSelected
                          ? "bg-yellow-500 dark:bg-yellow-600 text-gray-900 dark:text-gray-900"
                          : "bg-white/10 dark:bg-gray-700/50 backdrop-blur-md text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700"
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
              {selectedWinners.length > 0 && (
                <p className="text-red-200 dark:text-gray-400 text-sm">
                  {selectedWinners.length} winner
                  {selectedWinners.length !== 1 ? "s" : ""} selected:{" "}
                  {selectedWinners.join(", ")}
                </p>
              )}
            </>
          ) : null}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-300 dark:text-red-400 text-sm">{error}</p>
      )}

      {/* Log Game Button */}
      <button
        onClick={handleLogGame}
        className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
      >
        Log Game
      </button>
    </div>
  );
}
