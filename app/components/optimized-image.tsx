"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface OptimizedImageProps {
  src: string
  webpSrc?: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  onError?: () => void
}

export function OptimizedImage({
  src,
  webpSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
  onError,
}: OptimizedImageProps) {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
    if (onError) onError()
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 ${className}`}>
        <ImageIcon className="w-1/3 h-1/3 text-slate-600" />
      </div>
    )
  }

  // If we have both formats, use picture element for browser to choose the best format
  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={src} type={`image/${src.split(".").pop()?.toLowerCase() || "jpeg"}`} />
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
        />
      </picture>
    )
  }

  // Fallback to regular Next.js Image if we only have one format
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width || 500}
      height={height || 500}
      className={className}
      onError={handleError}
      priority={priority}
    />
  )
}
