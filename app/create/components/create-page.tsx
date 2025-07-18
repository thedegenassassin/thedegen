"use client"

import type React from "react"
import { useState } from "react"
import { ethers } from "@/app/lib/wallet"
import { useWallet } from "@/app/hooks/use-wallet"
import { nftContractAbi, nftContractAddress } from "@/app/lib/nft-contract"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  ImageIcon,
  Video,
  Music,
  FileText,
  Sparkles,
  Info,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { BlockchainSelector } from "../../components/blockchain-selector"
import { OptimizedImage } from "@/app/components/optimized-image"

const SUPPORTED_FORMATS = {
  image: {
    formats: ["JPG", "PNG", "GIF", "SVG", "WEBP"],
    maxSize: "50MB",
    description: "Images, GIFs, and vector graphics",
  },
  video: {
    formats: ["MP4", "WEBM", "MOV", "AVI"],
    maxSize: "100MB",
    description: "Videos and animations",
  },
  audio: {
    formats: ["MP3", "WAV", "OGG", "FLAC"],
    maxSize: "50MB",
    description: "Music and audio files",
  },
  "3d": {
    formats: ["GLB", "GLTF", "OBJ", "FBX"],
    maxSize: "100MB",
    description: "3D models and scenes",
  },
}

// Updated to match wallet's supported chains
const BLOCKCHAIN_OPTIONS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", gasPrice: "High", chainId: 1 },
  { id: "polygon", name: "Polygon", symbol: "MATIC", gasPrice: "Low", chainId: 137 },
  { id: "bsc", name: "Binance Smart Chain", symbol: "BNB", gasPrice: "Low", chainId: 56 },
  { id: "sepolia", name: "Sepolia Testnet", symbol: "ETH", gasPrice: "Low", chainId: 11155111 },
  { id: "base", name: "Base", symbol: "ETH", gasPrice: "Low", chainId: 8453 },
  { id: "optimism", name: "OP Mainnet", symbol: "ETH", gasPrice: "Low", chainId: 10 },
  { id: "soneium", name: "Soneium", symbol: "ETH", gasPrice: "Very Low", chainId: 1946 },
  { id: "ink", name: "Ink", symbol: "ETH", gasPrice: "Very Low", chainId: 57073 },
  { id: "worldchain", name: "Worldchain", symbol: "ETH", gasPrice: "Low", chainId: 480 },
  { id: "lisk", name: "Lisk", symbol: "ETH", gasPrice: "Low", chainId: 1135 },
]

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    royalties: "10",
    blockchain: "",
    collection: "",
    category: "",
    tags: [] as string[],
    unlockableContent: false,
    explicitContent: false,
    properties: [] as { key: string; value: string }[],
    levels: [] as any[],
    stats: [] as any[],
  })

  const [fileType, setFileType] = useState<"image" | "video" | "audio" | "3d">("image")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageData, setImageData] = useState<{
    original: string
    thumbnails: {
      small: string
      medium: string
      large: string
    }
    webp?: {
      original: string
      small: string
      medium: string
      large: string
    }
  } | null>(null)
  const [newTag, setNewTag] = useState("")

  const [isMinting, setIsMinting] = useState(false)
  const [mintingStatus, setMintingStatus] = useState("")

  const { address, signer, chainId, switchChain, isConnected } = useWallet()

  const handleInputChange = (field: string, value: string | boolean | any[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedFile(file)

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        throw new Error("File upload failed.")
      }

      const imageData = await response.json()
      setImageData(imageData)
      setImageUrl(imageData.original) // Keep this for backward compatibility

      toast({
        title: "File Uploaded",
        description: `${file.name} is ready.`,
        action: (
          <a href={imageData.original} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              View
            </Button>
          </a>
        ),
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Upload Error",
        description: "Could not upload the file. Please try again.",
        variant: "destructive",
      })
      setUploadedFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const addProperty = () => {
    handleInputChange("properties", [...formData.properties, { key: "", value: "" }])
  }

  const updateProperty = (index: number, field: "key" | "value", value: string) => {
    const newProperties = [...formData.properties]
    newProperties[index][field] = value
    handleInputChange("properties", newProperties)
  }

  const removeProperty = (index: number) => {
    handleInputChange(
      "properties",
      formData.properties.filter((_, i) => i !== index),
    )
  }

  const handleSubmit = async () => {
    if (!isConnected || !signer || !address || !chainId) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create an NFT.",
        variant: "destructive",
      })
      return
    }
    if (!imageUrl) {
      toast({
        title: "Image not uploaded",
        description: "Please upload an image for your NFT.",
        variant: "destructive",
      })
      return
    }

    const selectedChain = BLOCKCHAIN_OPTIONS.find((c) => c.id === formData.blockchain)
    if (!selectedChain) {
      toast({
        title: "No blockchain selected",
        description: "Please select a blockchain for your NFT.",
        variant: "destructive",
      })
      return
    }

    if (selectedChain.chainId !== chainId) {
      try {
        await switchChain(selectedChain.chainId as any)
        toast({
          title: "Network Switched",
          description: `Your wallet is now connected to ${selectedChain.name}. You can now proceed with minting.`,
        })
      } catch (error) {
        toast({
          title: "Network Switch Failed",
          description: "Please switch the network in your wallet manually.",
          variant: "destructive",
        })
        return
      }
    }

    const contractAddr = nftContractAddress[selectedChain.chainId]
    if (!contractAddr || contractAddr.startsWith("0xYour")) {
      toast({
        title: "Contract Not Configured",
        description: `The smart contract for ${selectedChain.name} is not configured yet.`,
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)

    try {
      // 1. Upload Metadata
      setMintingStatus("Uploading metadata to decentralized storage...")
      const metadata = {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        thumbnails: imageData?.thumbnails || null,
        webp: imageData?.webp || null,
        attributes: formData.properties,
      }

      const metadataResponse = await fetch("/api/upload-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata }),
      })
      if (!metadataResponse.ok) throw new Error("Failed to upload metadata")
      const metadataBlob = await metadataResponse.json()
      const tokenURI = metadataBlob.url

      // 2. Mint NFT
      setMintingStatus("Please confirm the transaction in your wallet...")
      const contract = new ethers.Contract(contractAddr, nftContractAbi, signer)
      const transaction = await contract.safeMint(address, tokenURI)

      setMintingStatus("Minting your NFT on the blockchain... this may take a moment.")
      await transaction.wait()

      toast({
        title: "NFT Minted Successfully!",
        description: "Your new NFT is now live on the blockchain.",
      })

      // Reset form
      setCurrentStep(1)
      setFormData({
        name: "",
        description: "",
        price: "",
        royalties: "10",
        blockchain: "",
        collection: "",
        category: "",
        tags: [],
        unlockableContent: false,
        explicitContent: false,
        properties: [],
        levels: [],
        stats: [],
      })
      setUploadedFile(null)
      setImageUrl(null)
    } catch (error: any) {
      console.error("Minting failed:", error)
      toast({
        title: "Minting Failed",
        description: error.reason || error.message || "An unknown error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsMinting(false)
      setMintingStatus("")
    }
  }

  const steps = [
    { id: 1, title: "Upload File", description: "Choose your digital asset" },
    { id: 2, title: "Basic Info", description: "Name, description, and pricing" },
    { id: 3, title: "Properties", description: "Attributes and metadata" },
    { id: 4, title: "Review & Mint", description: "Confirm and create" },
  ]

  if (isMinting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 flex items-center justify-center px-4">
        <Card className="bg-black/40 border-purple-500/30 text-center p-8 max-w-md w-full">
          <Loader2 className="w-16 h-16 text-purple-400 mx-auto animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Minting in Progress</h2>
          <p className="text-gray-400 mb-6">{mintingStatus}</p>
          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 w-full"
            onClick={() => {
              setIsMinting(false)
              setMintingStatus("")
              setCurrentStep(4) // Go back to review step
            }}
          >
            Cancel
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            Note: If the transaction was already submitted, cancelling here will not stop it on the blockchain.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Your NFT
            </h1>
            <p className="text-gray-400 text-lg">
              Mint your digital masterpiece across multiple blockchains and share it with the world
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id ? "bg-purple-600 text-white" : "bg-slate-700 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mx-4 ${currentStep > step.id ? "bg-purple-600" : "bg-slate-700"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">{steps[currentStep - 1].title}</h2>
              <p className="text-gray-400">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="p-8">
              {/* Step 1: Upload File */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* File Type Selection */}
                  <div>
                    <Label className="text-gray-300 text-lg mb-4 block">Choose File Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(SUPPORTED_FORMATS).map(([type, info]) => {
                        const icons = { image: ImageIcon, video: Video, audio: Music, "3d": FileText }
                        const Icon = icons[type as keyof typeof icons]
                        return (
                          <Button
                            key={type}
                            variant={fileType === type ? "default" : "outline"}
                            onClick={() => setFileType(type as any)}
                            className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                              fileType === type
                                ? "bg-purple-600 hover:bg-purple-700"
                                : "border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                            }`}
                          >
                            <Icon className="w-8 h-8" />
                            <div className="text-center">
                              <div className="font-medium capitalize">{type}</div>
                              <div className="text-xs opacity-70">{info.description}</div>
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div>
                    <Label className="text-gray-300 text-lg mb-4 block">Upload Your File</Label>
                    <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center hover:border-purple-400/70 transition-colors">
                      {!uploadedFile ? (
                        <>
                          <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-white mb-2">
                            Drag and drop your {fileType} file here
                          </h3>
                          <p className="text-gray-400 mb-4">or click to browse files</p>
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            accept={SUPPORTED_FORMATS[fileType].formats.map((f) => `.${f.toLowerCase()}`).join(",")}
                          />
                          <Button
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            onClick={() => document.getElementById("file-upload")?.click()}
                            disabled={isUploading}
                          >
                            {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Choose File
                          </Button>
                          <div className="mt-4 text-sm text-gray-500">
                            <p>Supported formats: {SUPPORTED_FORMATS[fileType].formats.join(", ")}</p>
                            <p>Max size: {SUPPORTED_FORMATS[fileType].maxSize}</p>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                          <div>
                            <h3 className="text-xl font-semibold text-white">{uploadedFile.name}</h3>
                            <p className="text-gray-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setUploadedFile(null)
                              setImageUrl(null)
                            }}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Requirements */}
                  <Alert className="border-blue-500/30 bg-blue-500/10">
                    <Info className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-300">
                      <strong>Tips for best results:</strong>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Use high-quality files for better presentation</li>
                        <li>• Square aspect ratios (1:1) work best for most platforms</li>
                        <li>• Ensure you own the rights to the content you're uploading</li>
                        <li>• Consider file size for faster loading times</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Step 2: Basic Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter NFT name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300">
                        Category
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/30">
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="photography">Photography</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="3d">3D Art</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="utility">Utility</SelectItem>
                          <SelectItem value="collectibles">Collectibles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your NFT in detail..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[120px]"
                      maxLength={1000}
                    />
                    <div className="text-xs text-gray-400 text-right">
                      {formData.description.length}/1000 characters
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Pricing and Blockchain */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-gray-300">
                        Price (ETH)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.001"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="royalties" className="text-gray-300">
                        Royalties (%)
                      </Label>
                      <Input
                        id="royalties"
                        type="number"
                        min="0"
                        max="50"
                        value={formData.royalties}
                        onChange={(e) => handleInputChange("royalties", e.target.value)}
                        className="bg-slate-800/50 border-purple-500/30 text-white"
                      />
                    </div>
                  </div>

                  {/* Blockchain Selection */}
                  <div className="space-y-4">
                    <BlockchainSelector
                      selectedBlockchain={formData.blockchain}
                      onSelect={(blockchainId) => handleInputChange("blockchain", blockchainId)}
                      showDetails={true}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Properties */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Tabs defaultValue="properties" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                      <TabsTrigger value="properties">Properties</TabsTrigger>
                      <TabsTrigger value="levels">Levels</TabsTrigger>
                      <TabsTrigger value="stats">Stats</TabsTrigger>
                    </TabsList>

                    <TabsContent value="properties" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Properties</h3>
                          <p className="text-gray-400 text-sm">Textual traits that show up as rectangles</p>
                        </div>
                        <Button
                          onClick={addProperty}
                          variant="outline"
                          size="sm"
                          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Property
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {formData.properties.map((property, index) => (
                          <div key={index} className="flex gap-3 items-center">
                            <Input
                              placeholder="Property name"
                              value={property.key}
                              onChange={(e) => updateProperty(index, "key", e.target.value)}
                              className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                            />
                            <Input
                              placeholder="Value"
                              value={property.value}
                              onChange={(e) => updateProperty(index, "value", e.target.value)}
                              className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                            />
                            <Button
                              onClick={() => removeProperty(index)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="levels" className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Levels</h3>
                        <p className="text-gray-400 text-sm">Numerical traits that show as a progress bar</p>
                      </div>
                      <Alert className="border-blue-500/30 bg-blue-500/10">
                        <Info className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-blue-300">
                          Levels feature coming soon! This will allow you to add numerical traits with progress bars.
                        </AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Stats</h3>
                        <p className="text-gray-400 text-sm">Numerical traits that just show as numbers</p>
                      </div>
                      <Alert className="border-blue-500/30 bg-blue-500/10">
                        <Info className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-blue-300">
                          Stats feature coming soon! This will allow you to add numerical traits displayed as numbers.
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>

                  {/* Additional Options */}
                  <div className="space-y-4 pt-6 border-t border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Unlockable Content</Label>
                        <p className="text-sm text-gray-400">
                          Include unlockable content that can only be revealed by the owner
                        </p>
                      </div>
                      <Switch
                        checked={formData.unlockableContent}
                        onCheckedChange={(checked) => handleInputChange("unlockableContent", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Explicit & Sensitive Content</Label>
                        <p className="text-sm text-gray-400">Set this item as explicit and sensitive content</p>
                      </div>
                      <Switch
                        checked={formData.explicitContent}
                        onCheckedChange={(checked) => handleInputChange("explicitContent", checked)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Review Your NFT</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Preview */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Preview</h4>
                      <Card className="bg-slate-800/50 border-purple-500/30">
                        <CardContent className="p-6">
                          <div className="aspect-square w-full bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                            {imageUrl ? (
                              <OptimizedImage
                                src={imageUrl}
                                webpSrc={imageData?.webp?.original}
                                alt={formData.name || "NFT Preview"}
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
                                <ImageIcon className="w-12 h-12 mb-2" />
                                <p className="text-sm">Your NFT image will appear here once uploaded.</p>
                              </div>
                            )}
                          </div>
                          <h3
                            className="text-xl font-bold text-white mb-2 truncate"
                            title={formData.name || "Untitled"}
                          >
                            {formData.name || "Untitled"}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 h-10 overflow-y-auto">
                            {formData.description || "No description"}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-purple-400 font-semibold">{formData.price || "0"} ETH</span>
                            <Badge className="bg-purple-500/20 text-purple-400">
                              {BLOCKCHAIN_OPTIONS.find((b) => b.id === formData.blockchain)?.name || "No blockchain"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Details</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Name:</span>
                            <p className="text-white">{formData.name || "Not set"}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Category:</span>
                            <p className="text-white capitalize">{formData.category || "Not set"}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Price:</span>
                            <p className="text-white">{formData.price || "0"} ETH</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Royalties:</span>
                            <p className="text-white">{formData.royalties}%</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Blockchain:</span>
                            <p className="text-white">
                              {BLOCKCHAIN_OPTIONS.find((b) => b.id === formData.blockchain)?.name || "Not selected"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400">File Type:</span>
                            <p className="text-white capitalize">{fileType}</p>
                          </div>
                        </div>

                        {formData.tags.length > 0 && (
                          <div>
                            <span className="text-gray-400 text-sm">Tags:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {formData.tags.map((tag, index) => (
                                <Badge key={index} className="bg-purple-500/20 text-purple-400 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {formData.properties.length > 0 && (
                          <div>
                            <span className="text-gray-400 text-sm">Properties:</span>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              {formData.properties.map((prop, index) => (
                                <div key={index} className="bg-slate-700/50 p-2 rounded text-xs">
                                  <div className="text-gray-400">{prop.key}</div>
                                  <div className="text-white">{prop.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-4 text-sm">
                          {formData.unlockableContent && (
                            <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Unlockable Content
                            </Badge>
                          )}
                          {formData.explicitContent && (
                            <Badge className="bg-red-500/20 text-red-400 text-xs">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Explicit Content
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert className="border-yellow-500/30 bg-yellow-500/10">
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-yellow-300">
                      <strong>Important:</strong> Once you create this NFT, some details cannot be changed. Please
                      review everything carefully before proceeding.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-purple-500/30">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                >
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={
                      (currentStep === 1 && !imageUrl) ||
                      (currentStep === 2 && (!formData.name || !formData.blockchain))
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!isConnected}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Mint NFT
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
