import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { processImage } from "@/app/lib/image-utils"
import { v4 as uuidv4 } from "uuid"

// Helper function to upload to Vercel Blob
async function uploadToBlob(filename: string, data: Buffer, contentType: string) {
  return await put(filename, data, {
    access: "public",
    contentType,
  })
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "No filename provided." }, { status: 400 })
    }

    // Generate a unique ID for this upload to avoid filename collisions
    const uniqueId = uuidv4()
    const uniqueFilename = `${uniqueId}-${filename}`

    // Get file buffer from request
    const data = await request.arrayBuffer()
    const buffer = Buffer.from(data)

    // Check if this is an image file
    const imageTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg"]
    const fileExtension = filename.split(".").pop()?.toLowerCase() || ""

    if (imageTypes.includes(fileExtension)) {
      // Process image and generate thumbnails
      const processedImage = await processImage(buffer, uniqueFilename, uploadToBlob)

      return NextResponse.json(processedImage)
    } else {
      // For non-image files, just upload as is
      const blob = await put(uniqueFilename, buffer, {
        access: "public",
      })

      return NextResponse.json({
        original: blob.url,
        thumbnails: {
          small: blob.url,
          medium: blob.url,
          large: blob.url,
        },
      })
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 })
  }
}
