"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Camera, Upload, X, ImageIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ImageUploadProps {
  currentImage?: string | null
  onImageChange: (file: File | null, previewUrl: string | null) => void
  type: "avatar" | "cover"
  className?: string
}

export function ImageUpload({ currentImage, onImageChange, type, className = "" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxSize = 5 * 1024 * 1024 // 5MB
  const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, WebP, or GIF)"
    }
    if (file.size > maxSize) {
      return "File size must be less than 5MB"
    }
    return null
  }

  const handleFileSelect = useCallback(
    async (file: File) => {
      setIsLoading(true)

      const error = validateFile(file)
      if (error) {
        toast({
          title: "Invalid file",
          description: error,
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      try {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        onImageChange(file, previewUrl)

        toast({
          title: "Image uploaded",
          description: `${type === "avatar" ? "Profile picture" : "Cover image"} updated successfully`,
        })
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [onImageChange, type],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleRemoveImage = useCallback(() => {
    onImageChange(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast({
      title: "Image removed",
      description: `${type === "avatar" ? "Profile picture" : "Cover image"} has been removed`,
    })
  }, [onImageChange, type])

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  if (type === "avatar") {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label className="text-gray-300 mb-2 block">Profile Picture</Label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div
              className={`relative w-20 h-20 rounded-full border-2 border-dashed transition-colors cursor-pointer ${
                isDragging ? "border-purple-400 bg-purple-500/10" : "border-purple-500/50 hover:border-purple-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              {currentImage ? (
                <Image
                  src={currentImage || "/placeholder.svg"}
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-800/50 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>

            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 rounded-full"
              onClick={openFileDialog}
              disabled={isLoading}
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="text-sm text-gray-400 space-y-1">
              <p>Recommended: 400x400px</p>
              <p>Max size: 5MB</p>
              <p>Formats: JPEG, PNG, WebP, GIF</p>
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                onClick={openFileDialog}
                disabled={isLoading}
              >
                <Upload className="w-4 h-4 mr-1" />
                Upload
              </Button>

              {currentImage && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  onClick={handleRemoveImage}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    )
  }

  // Cover image upload
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-gray-300 mb-2 block">Cover Image</Label>
      <div
        className={`relative h-32 rounded-lg border-2 border-dashed transition-colors cursor-pointer overflow-hidden ${
          isDragging ? "border-purple-400 bg-purple-500/10" : "border-purple-500/50 hover:border-purple-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        {currentImage ? (
          <Image src={currentImage || "/placeholder.svg"} alt="Cover preview" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-white/70 mx-auto mb-2" />
              <p className="text-white/70 text-sm">Click or drag to upload cover image</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/60 hover:bg-black/80"
            onClick={(e) => {
              e.stopPropagation()
              openFileDialog()
            }}
            disabled={isLoading}
          >
            <Camera className="w-4 h-4 mr-1" />
            Change
          </Button>

          {currentImage && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-red-600/80 hover:bg-red-700/80"
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveImage()
              }}
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-400">
        <p>Recommended: 1200x300px • Max size: 5MB • Formats: JPEG, PNG, WebP, GIF</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  )
}
