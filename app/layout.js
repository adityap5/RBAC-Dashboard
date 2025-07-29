import { AuthProvider } from "../hooks/useAuth"
import "./globals.css"

export const metadata = {
  title: "RBAC Dashboard",
  description: "Role-Based Access Control Dashboard",
    generator: 'ap29.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
