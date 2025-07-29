"use client"

import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Lock } from "lucide-react"

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
        return
      }

      if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, loading, hasRole, allowedRoles, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Shield className="h-16 w-16 text-blue-600" />
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Securing Your Access</h2>
          <p className="text-gray-600">Verifying your permissions...</p>

          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                className="w-2 h-2 bg-blue-600 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  if (!user || (allowedRoles.length > 0 && !hasRole(allowedRoles))) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Lock className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Redirecting to appropriate page...</p>
        </motion.div>
      </div>
    )
  }

  return children
}
