import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";

export const metadata = {
  title: "Monopoly Win Tracker",
  description: "Track Monopoly game results among your friend group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
