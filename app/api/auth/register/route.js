import clientPromise from "../../../../lib/mongodb"
import { hashPassword } from "../../../../lib/auth"
import { logActivity } from "../../../../lib/logger"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("assignment")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const hashedPassword = hashPassword(password)
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "viewer", // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Log the registration activity
    await logActivity(result.insertedId, "user_registered", {
      email,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
