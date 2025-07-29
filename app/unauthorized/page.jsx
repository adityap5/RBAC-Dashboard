"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-75" />
          <div className="relative bg-red-100 rounded-full p-6 inline-block">
            <Shield className="h-16 w-16 text-red-600" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Access Denied</h2>
          <div className="flex items-center justify-center text-red-600 mb-4">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Insufficient Permissions</span>
          </div>
          <p className="text-gray-600">You don't have permission to access this resource.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-gray-500"
        >
          If you believe this is an error, please contact your administrator.
        </motion.div>
      </motion.div>
    </div>
  )
}
