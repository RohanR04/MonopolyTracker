import MonopolyTracker from "../components/MonopolyTracker";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white dark:text-gray-100 text-center flex-1">
            Monopoly Win Tracker
          </h1>
          <ThemeToggle />
        </div>
        <MonopolyTracker />
      </div>
    </main>
  );
}
