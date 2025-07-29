import clientPromise from "./mongodb"

export async function logActivity(userId, action, details = {}) {
  try {
    const client = await clientPromise
    const db = client.db("assignment")

    await db.collection("logs").insertOne({
      userId,
      action,
      details,
      timestamp: new Date(),
      ip: details.ip || "unknown",
    })
  } catch (error) {
    console.error("Failed to log activity:", error)
  }
}
