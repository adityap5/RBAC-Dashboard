import { roleMiddleware } from "../../../../lib/middleware"
import clientPromise from "../../../../lib/mongodb"
import { logActivity } from "../../../../lib/logger"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
  const { id } = params

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid content ID" }, { status: 400 })
  }

  const authResult = await roleMiddleware(["admin", "editor"])(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  try {
    const client = await clientPromise
    const db = client.db("assignment")

    // Check if content exists and user has permission
    const content = await db.collection("content").findOne({ _id: new ObjectId(id) })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Editors can only delete their own content, admins can delete any
    if (authResult.user.role === "editor" && content.authorId.toString() !== authResult.user._id.toString()) {
      return NextResponse.json({ error: "You can only delete your own content" }, { status: 403 })
    }

    const result = await db.collection("content").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Log the activity
    await logActivity(authResult.user._id, "content_deleted", {
      contentId: id,
      title: content.title,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    return NextResponse.json({ message: "Content deleted successfully" })
  } catch (error) {
    console.error("Delete content error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
