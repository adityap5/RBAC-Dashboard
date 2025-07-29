"use client"

import { useAuth } from "../../hooks/useAuth"
import Layout from "../../components/Layout"
import ProtectedRoute from "../../components/ProtectedRoute"
import { motion } from "framer-motion"
import { Users, FileText, Activity, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default function Dashboard() {
  const { user, hasRole } = useAuth()

  const stats = [
    {
      name: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      show: hasRole(["admin"]),
      color: "bg-blue-500",
    },
    {
      name: "Content Items",
      value: "567",
      change: "+8%",
      icon: FileText,
      show: hasRole(["admin", "editor"]),
      color: "bg-green-500",
    },
    {
      name: "System Activities",
      value: "89",
      change: "+23%",
      icon: Activity,
      show: hasRole(["admin"]),
      color: "bg-purple-500",
    },
    {
      name: "Security Events",
      value: "12",
      change: "-5%",
      icon: Shield,
      show: hasRole(["admin"]),
      color: "bg-red-500",
    },
  ].filter((stat) => stat.show)

  const getRoleDescription = (role) => {
    switch (role) {
      case "admin":
        return "You have full access to all system features including user management and system logs."
      case "editor":
        return "You can manage content and view analytics, but cannot access user management features."
      case "viewer":
        return "You have read-only access to content and basic dashboard information."
      default:
        return "Your role permissions are being loaded..."
    }
  }

  const quickActions = [
    {
      name: "Manage Users",
      description: "Add, edit, or remove user accounts",
      icon: Users,
      href: "/dashboard/users",
      show: hasRole(["admin"]),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "View System Logs",
      description: "Monitor system activities and security events",
      icon: Activity,
      href: "/dashboard/logs",
      show: hasRole(["admin"]),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      name: "Manage Content",
      description: "Create, edit, and publish content",
      icon: FileText,
      href: "/dashboard/content",
      show: hasRole(["admin", "editor"]),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "View Content",
      description: "Browse published content",
      icon: FileText,
      href: "/dashboard/view",
      show: hasRole(["viewer"]),
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
  ].filter((action) => action.show)

  const recentActivities = [
    {
      action: "Logged into dashboard",
      time: "Just now",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      action: "Updated profile settings",
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      action: "Created new content",
      time: "1 day ago",
      icon: FileText,
      color: "text-purple-600",
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
      <Layout>
        <div className="space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.1 }}>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
            <p className="mt-2 text-gray-600">{getRoleDescription(user?.role)}</p>
          </motion.div>

          {/* Role Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          >
            <Shield className="w-4 h-4 mr-2" />
            {user?.role?.toUpperCase()} ACCESS
          </motion.div>

          {/* Stats Grid */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.2 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <div className="flex items-center mt-2">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                            <span className="text-sm text-gray-500 ml-1">from last month</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl border border-gray-100"
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-600 mt-1">Common tasks for your role</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.button
                      key={action.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg text-white text-left transition-all duration-200 ${action.color} shadow-md hover:shadow-lg`}
                    >
                      <Icon className="h-6 w-6 mb-3" />
                      <h4 className="font-medium text-sm">{action.name}</h4>
                      <p className="text-xs opacity-90 mt-1">{action.description}</p>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl border border-gray-100"
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-400" />
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
