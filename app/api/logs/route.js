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

    const { searchParams } = new URL(request.url)
    const query = {}
    const filter = searchParams.get("filter")

    // Apply filters
    if (filter && filter !== "all") {
      switch (filter) {
        case "login":
          query.action = { $in: ["login", "logout"] }
          break
        case "user":
          query.action = { $in: ["user_created", "user_updated", "user_deleted"] }
          break
        case "content":
          query.action = { $in: ["content_created", "content_updated", "content_deleted"] }
          break
      }
    }

    // Get logs with user information
    const logs = await db
      .collection("logs")
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $addFields: {
            userName: { $arrayElemAt: ["$user.name", 0] },
          },
        },
        { $project: { user: 0 } },
        { $sort: { timestamp: -1 } },
        { $limit: 100 },
      ])
      .toArray()

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Fetch logs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
