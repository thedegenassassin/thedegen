import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json()
  const { metadata } = body

  if (!metadata) {
    return NextResponse.json({ error: "Missing metadata" }, { status: 400 })
  }

  const filename = `metadata/${uuidv4()}.json`

  const blob = await put(filename, JSON.stringify(metadata), {
    access: "public",
    contentType: "application/json",
  })

  return NextResponse.json(blob)
}
