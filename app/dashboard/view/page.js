"use client"

import { useState, useEffect } from "react"
import Layout from "../../../components/Layout"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { FileText, Eye } from "lucide-react"

export default function ViewContent() {
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedContent, setSelectedContent] = useState(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/content?status=published", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setContent(data)
      } else {
        setError("Failed to fetch content")
      }
    } catch (error) {
      setError("Failed to fetch content")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["viewer"]}>
        <Layout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["viewer"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">View Content</h1>
            <p className="mt-1 text-sm text-gray-600">Browse published content (read-only access)</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Published Content ({content.length})</h3>
              </div>

              <div className="space-y-4">
                {content.map((item) => (
                  <div key={item._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{item.body}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Published
                          </span>
                          <span className="text-xs text-gray-500">
                            By {item.authorName} • {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button onClick={() => setSelectedContent(item)} className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {content.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No content available</h3>
                    <p className="mt-1 text-sm text-gray-500">No published content is currently available to view.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Modal */}
          {selectedContent && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedContent.title}</h3>
                    <button onClick={() => setSelectedContent(null)} className="text-gray-400 hover:text-gray-600">
                      ✕
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    By {selectedContent.authorName} • {new Date(selectedContent.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-gray-900 whitespace-pre-wrap">{selectedContent.body}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
