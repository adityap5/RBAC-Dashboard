import { authMiddleware } from "../../../../lib/middleware"
import { NextResponse } from "next/server"

export async function GET(request) {
  const authResult = await authMiddleware(request)

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  const { password, ...userWithoutPassword } = authResult.user
  return NextResponse.json(userWithoutPassword)
}
