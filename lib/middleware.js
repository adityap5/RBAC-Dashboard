import { verifyToken, getTokenFromRequest } from "./auth"
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function authMiddleware(req) {
  const token = getTokenFromRequest(req)

  if (!token) {
    return { error: "No token provided", status: 401 }
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return { error: "Invalid token", status: 401 }
  }

  const client = await clientPromise
  const db = client.db("assignment")

  let userId
  try {
    userId = ObjectId.isValid(decoded.userId) ? new ObjectId(decoded.userId) : decoded.userId
  } catch (error) {
    userId = decoded.userId
  }

  const user = await db.collection("users").findOne({ _id: userId })

  if (!user) {
    return { error: "User not found", status: 401 }
  }

  return { user }
}

export function roleMiddleware(allowedRoles) {
  return async (req) => {
    const authResult = await authMiddleware(req)

    if (authResult.error) {
      return authResult
    }

    if (!allowedRoles.includes(authResult.user.role)) {
      return {
        error: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
        status: 403,
      }
    }

    return authResult
  }
}
