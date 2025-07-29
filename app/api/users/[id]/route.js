import { roleMiddleware } from "../../../../lib/middleware"
import clientPromise from "../../../../lib/mongodb"
import { logActivity } from "../../../../lib/logger"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  const { id } = params

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
  }

  const authResult = await roleMiddleware(["admin"])(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  try {
    const { role } = await request.json()

    if (!["admin", "editor", "viewer"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("assignment")

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Log the activity
    await logActivity(authResult.user._id, "user_updated", {
      targetUserId: id,
      newRole: role,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    return NextResponse.json({ message: "User role updated successfully" })
  } catch (error) {
    console.error("User update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { id } = params

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
  }

  const authResult = await roleMiddleware(["admin"])(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  try {
    // Prevent admin from deleting themselves
    if (id === authResult.user._id.toString()) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("assignment")

    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Log the activity
    await logActivity(authResult.user._id, "user_deleted", {
      targetUserId: id,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("User delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
