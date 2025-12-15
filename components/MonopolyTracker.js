"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import PlayerManager from "./PlayerManager";
import GameLogger from "./GameLogger";
import StatsDashboard from "./StatsDashboard";
import GameHistory from "./GameHistory";

export default function MonopolyTracker() {
  const [games, setGames] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [currentView, setCurrentView] = useState("log");
  const [loading, setLoading] = useState(true);

  // Helper function to normalize Firebase Timestamp to ISO string
  const normalizeDate = (dateValue) => {
    if (!dateValue) return null;
    // If it's a Firebase Timestamp, convert to Date then ISO string
    if (dateValue && typeof dateValue.toDate === "function") {
      return dateValue.toDate().toISOString();
    }
    // If it's already a string, return as is
    if (typeof dateValue === "string") {
      return dateValue;
    }
    // If it's a Date object, convert to ISO string
    if (dateValue instanceof Date) {
      return dateValue.toISOString();
    }
    return dateValue;
  };

  // Set up real-time listeners for games and players
  useEffect(() => {
    const unsubscribeGames = onSnapshot(
      collection(db, "games"),
      (snapshot) => {
        const gamesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: normalizeDate(data.date),
          };
        });
        setGames(gamesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    );

    const unsubscribePlayers = onSnapshot(
      collection(db, "players"),
      (snapshot) => {
        const playersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllPlayers(playersData);
      },
      (error) => {
        console.error("Error fetching players:", error);
      }
    );

    return () => {
      unsubscribeGames();
      unsubscribePlayers();
    };
  }, []);

  const handleAddPlayer = async (name) => {
    try {
      await addDoc(collection(db, "players"), {
        name: name,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    }
  };

  const handleLogGame = async (gameData) => {
    try {
      await addDoc(collection(db, "games"), {
        ...gameData,
        date: gameData.date || serverTimestamp(),
      });
    } catch (error) {
      console.error("Error logging game:", error);
      alert("Failed to log game. Please try again.");
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (!confirm("Are you sure you want to delete this game?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "games", gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("Failed to delete game. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-8 text-center">
        <p className="text-white dark:text-gray-100">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-1 flex gap-1">
        <button
          onClick={() => setCurrentView("log")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentView === "log"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              : "text-white dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/50"
          }`}
        >
          Log
        </button>
        <button
          onClick={() => setCurrentView("stats")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentView === "stats"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              : "text-white dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/50"
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => setCurrentView("history")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentView === "history"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              : "text-white dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/50"
          }`}
        >
          History
        </button>
      </div>

      {/* Player Manager - Always visible in Log view */}
      {currentView === "log" && (
        <>
          <PlayerManager players={allPlayers} onAddPlayer={handleAddPlayer} />
          <GameLogger players={allPlayers} onLogGame={handleLogGame} />
        </>
      )}

      {/* Stats View */}
      {currentView === "stats" && (
        <StatsDashboard games={games} players={allPlayers} />
      )}

      {/* History View */}
      {currentView === "history" && (
        <GameHistory games={games} onDeleteGame={handleDeleteGame} />
      )}
    </div>
  );
}
