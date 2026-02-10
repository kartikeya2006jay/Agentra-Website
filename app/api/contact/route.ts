import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.email || !body.message) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true })
}