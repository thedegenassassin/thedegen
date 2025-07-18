"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

export default function ImageTestPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Sample images with extreme aspect ratios
  const testImages = [
    {
      name: "Ultra-Wide Panorama (5:1)",
      url: "/placeholder.svg?height=400&width=2000",
      aspectRatio: "5:1",
    },
    {
      name: "Wide Landscape (16:9)",
      url: "/placeholder.svg?height=720&width=1280",
      aspectRatio: "16:9",
    },
    {
      name: "Square (1:1)",
      url: "/placeholder.svg?height=800&width=800",
      aspectRatio: "1:1",
    },
    {
      name: "Portrait (9:16)",
      url: "/placeholder.svg?height=1280&width=720",
      aspectRatio: "9:16",
    },
    {
      name: "Tall Portrait (1:5)",
      url: "/placeholder.svg?height=2000&width=400",
      aspectRatio: "1:5",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Image Aspect Ratio Test
            </h1>
            <p className="text-gray-400 text-lg">
              Testing how different aspect ratios display with object-contain in a square container
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Preview Container - Same as in NFT creation page */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Preview with object-contain</h2>
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="aspect-square w-full bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                    {selectedImage ? (
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <p className="text-sm">Select an image to preview</p>
                      </div>
                    )}
                  </div>
                  <div className="text-center text-white">
                    <p>
                      Using <code className="bg-slate-700 px-1 py-0.5 rounded">object-contain</code>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Preserves aspect ratio with letterboxing/pillarboxing</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alternative with object-cover for comparison */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Alternative with object-cover</h2>
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="aspect-square w-full bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                    {selectedImage ? (
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <p className="text-sm">Select an image to preview</p>
                      </div>
                    )}
                  </div>
                  <div className="text-center text-white">
                    <p>
                      Using <code className="bg-slate-700 px-1 py-0.5 rounded">object-cover</code>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Fills container but may crop image edges</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Test Images */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Test Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testImages.map((image, index) => (
                <Card
                  key={index}
                  className={`bg-slate-800/50 border-2 transition-all cursor-pointer ${
                    selectedImage === image.url ? "border-purple-500" : "border-slate-700/50 hover:border-purple-500/50"
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <CardContent className="p-4">
                    <div className="h-24 bg-slate-700/50 rounded flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">{image.name}</p>
                      <p className="text-gray-400 text-sm">Aspect Ratio: {image.aspectRatio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upload Your Own */}
          <Card className="bg-black/40 border-purple-500/30 mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Upload Your Own Test Image</h2>
              <p className="text-gray-400 mb-4">
                Upload your own image to test how it appears in the preview containers
              </p>

              <input
                type="file"
                accept="image/*"
                id="custom-image"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setSelectedImage(url)
                  }
                }}
              />

              <Button
                onClick={() => document.getElementById("custom-image")?.click()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Upload Image
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
