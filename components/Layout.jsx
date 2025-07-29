"use client"

import { useAuth } from "../hooks/useAuth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Eye, LogOut, Activity, Shield, Edit3, Menu, X, Bell, Settings } from "lucide-react"
import { useState } from "react"

export default function Layout({ children }) {
  const { user, logout, hasRole } = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Activity,
      roles: ["admin", "editor", "viewer"],
      color: "text-blue-600",
    },
    {
      name: "User Management",
      href: "/dashboard/users",
      icon: Users,
      roles: ["admin"],
      color: "text-purple-600",
    },
    {
      name: "System Logs",
      href: "/dashboard/logs",
      icon: Shield,
      roles: ["admin"],
      color: "text-red-600",
    },
    {
      name: "Content Management",
      href: "/dashboard/content",
      icon: Edit3,
      roles: ["admin", "editor"],
      color: "text-green-600",
    },
    {
      name: "View Content",
      href: "/dashboard/view",
      icon: Eye,
      roles: ["viewer"],
      color: "text-indigo-600",
    },
  ]

  const filteredNavigation = navigation.filter((item) => hasRole(item.roles))

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Mobile sidebar backdrop */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.div
          variants={sidebarVariants}
          animate={sidebarOpen ? "open" : "closed"}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-2xl lg:static lg:translate-x-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-blue-600" />
                    RBAC Dashboard
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-600 mt-1"
                  >
                    Role: <span className="font-medium capitalize text-blue-600">{user?.role}</span>
                  </motion.p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {filteredNavigation.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-r-2 border-blue-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${isActive ? item.color : "text-gray-400 group-hover:text-gray-600"}`}
                      />
                      {item.name}
                      {isActive && (
                        <motion.div layoutId="activeTab" className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  )
}
