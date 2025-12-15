import './globals.css'

export const metadata = {
  title: 'Monopoly Win Tracker',
  description: 'Track Monopoly game results among your friend group',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

