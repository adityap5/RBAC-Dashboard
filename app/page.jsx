"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { motion } from "framer-motion"
import { Shield, Users, Lock, Eye } from "lucide-react"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="inline-block"
        >
          <Shield className="h-16 w-16 text-blue-600 mb-4" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">RBAC Dashboard</h1>
        <p className="text-gray-600 mb-8">Loading your secure workspace...</p>

        <div className="flex justify-center space-x-4">
          {[Users, Lock, Eye].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
            >
              <Icon className="h-6 w-6 text-blue-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
