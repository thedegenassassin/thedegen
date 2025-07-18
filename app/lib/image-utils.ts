import sharp from "sharp"

export type ThumbnailSizes = {
  small: number
  medium: number
  large: number
}

export const DEFAULT_THUMBNAIL_SIZES: ThumbnailSizes = {
  small: 200, // For grid listings
  medium: 400, // For medium cards
  large: 800, // For detailed views
}

export interface ProcessedImage {
  original: string
  thumbnails: {
    small: string
    medium: string
    large: string
  }
  webp: {
    original: string
    small: string
    medium: string
    large: string
  }
}

/**
 * Processes an image buffer and generates thumbnails of different sizes
 * Also creates WebP versions for modern browsers
 */
export async function processImage(
  imageBuffer: Buffer,
  filename: string,
  uploadFunction: (filename: string, data: Buffer, contentType: string) => Promise<{ url: string }>,
  sizes: ThumbnailSizes = DEFAULT_THUMBNAIL_SIZES,
): Promise<ProcessedImage> {
  // Get image metadata to determine format
  const metadata = await sharp(imageBuffer).metadata()
  const originalFormat = metadata.format || "jpeg"

  // Process original image (optimize but keep full size)
  const optimizedOriginal = await sharp(imageBuffer)
    .rotate() // Auto-rotate based on EXIF data
    .toFormat(originalFormat as keyof sharp.FormatEnum, { quality: 85 })
    .toBuffer()

  // Upload original
  const originalResult = await uploadFunction(`original/${filename}`, optimizedOriginal, `image/${originalFormat}`)

  // Create WebP version of original
  const webpOriginal = await sharp(imageBuffer)
    .rotate()
    .webp({ quality: 80, effort: 4 }) // effort: 0-6, higher means slower but better compression
    .toBuffer()

  // Upload WebP original
  const webpOriginalResult = await uploadFunction(`original/${filename.split(".")[0]}.webp`, webpOriginal, "image/webp")

  // Generate and upload thumbnails in original format
  const thumbnailPromises = Object.entries(sizes).map(async ([size, dimension]) => {
    // Resize image while maintaining aspect ratio
    const resizedBuffer = await sharp(imageBuffer)
      .rotate() // Auto-rotate based on EXIF data
      .resize({
        width: dimension,
        height: dimension,
        fit: "inside", // Maintains aspect ratio
        withoutEnlargement: true, // Don't enlarge if image is smaller
      })
      .toFormat(originalFormat as keyof sharp.FormatEnum, {
        quality: 80, // Slightly lower quality for thumbnails
      })
      .toBuffer()

    // Upload thumbnail
    const result = await uploadFunction(`thumbnails/${size}/${filename}`, resizedBuffer, `image/${originalFormat}`)

    return { size, url: result.url }
  })

  // Generate and upload WebP thumbnails
  const webpThumbnailPromises = Object.entries(sizes).map(async ([size, dimension]) => {
    // Resize image and convert to WebP
    const resizedBuffer = await sharp(imageBuffer)
      .rotate()
      .resize({
        width: dimension,
        height: dimension,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 75, // WebP can use slightly lower quality settings while maintaining visual quality
        effort: 4,
      })
      .toBuffer()

    // Upload WebP thumbnail
    const result = await uploadFunction(
      `thumbnails/${size}/${filename.split(".")[0]}.webp`,
      resizedBuffer,
      "image/webp",
    )

    return { size, url: result.url }
  })

  const thumbnailResults = await Promise.all(thumbnailPromises)
  const webpThumbnailResults = await Promise.all(webpThumbnailPromises)

  // Construct result object
  const processedImage: ProcessedImage = {
    original: originalResult.url,
    thumbnails: {
      small: thumbnailResults.find((t) => t.size === "small")?.url || originalResult.url,
      medium: thumbnailResults.find((t) => t.size === "medium")?.url || originalResult.url,
      large: thumbnailResults.find((t) => t.size === "large")?.url || originalResult.url,
    },
    webp: {
      original: webpOriginalResult.url,
      small: webpThumbnailResults.find((t) => t.size === "small")?.url || webpOriginalResult.url,
      medium: webpThumbnailResults.find((t) => t.size === "medium")?.url || webpOriginalResult.url,
      large: webpThumbnailResults.find((t) => t.size === "large")?.url || webpOriginalResult.url,
    },
  }

  return processedImage
}
