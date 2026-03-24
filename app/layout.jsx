import './globals.css'

export const metadata = {
  title: "AI Sustainability — Shubham's Tracker",
  description: 'Tracking the environmental cost of artificial intelligence — energy, carbon, and water impact of global AI data centers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
