import { roleMiddleware } from "../../../lib/middleware"
import clientPromise from "../../../lib/mongodb"
import { logActivity } from "../../../lib/logger"
import { NextResponse } from "next/server"

export async function GET(request) {
  const authResult = await roleMiddleware(["admin", "editor", "viewer"])(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  try {
    const client = await clientPromise
    const db = client.db("assignment")

    const { searchParams } = new URL(request.url)
    const query = {}

    // Viewers can only see published content
    if (authResult.user.role === "viewer") {
      query.status = "published"
    }

    // Check for status filter
    if (searchParams.get("status")) {
      query.status = searchParams.get("status")
    }

    const content = await db.collection("content").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(content)
  } catch (error) {
    console.error("Fetch content error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  const authResult = await roleMiddleware(["admin", "editor"])(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  try {
    const { title, body, status = "draft" } = await request.json()

    if (!title || !body) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 })
    }

    if (!["draft", "published", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("assignment")

    const result = await db.collection("content").insertOne({
      title,
      body,
      status,
      authorId: authResult.user._id,
      authorName: authResult.user.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Log the activity
    await logActivity(authResult.user._id, "content_created", {
      contentId: result.insertedId,
      title,
      status,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    return NextResponse.json({ message: "Content created successfully", id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Create content error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
