import { roleMiddleware } from "../../../lib/middleware"
import clientPromise from "../../../lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(request) {
  const authResult = await roleMiddleware(["admin"])(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  try {
    const client = await clientPromise
    const db = client.db("assignment")

    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(users)
  } catch (error) {
    console.error("Fetch users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
