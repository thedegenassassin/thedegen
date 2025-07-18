"use client"

/**
 * Detects if the browser supports WebP format
 * This is used as a fallback if the <picture> element approach doesn't work
 */
export async function supportsWebP(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false // Server-side rendering
  }

  // Check for createImageBitmap support
  if (!("createImageBitmap" in window)) {
    return false
  }

  // Create a WebP image in memory and try to decode it
  const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  const blob = await fetch(webpData).then((r) => r.blob())

  try {
    return await createImageBitmap(blob).then(
      () => true,
      () => false,
    )
  } catch (e) {
    return false
  }
}
