import MonopolyTracker from '../components/MonopolyTracker'

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Monopoly Win Tracker
        </h1>
        <MonopolyTracker />
      </div>
    </main>
  )
}

