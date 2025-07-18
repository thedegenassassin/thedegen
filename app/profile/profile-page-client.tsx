"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Settings,
  Share2,
  Copy,
  Heart,
  Grid3X3,
  TrendingUp,
  Wallet,
  Award,
  Save,
  X,
  CheckCircle,
  Activity,
  DollarSign,
  Zap,
  Target,
  Calendar,
  ShoppingCart,
  Palette,
  Send,
} from "lucide-react"
import { NFTCard } from "../components/nft-card"
import { toast } from "@/hooks/use-toast"
import { useProfile } from "@/app/hooks/use-profile"
import { ImageUpload } from "@/app/components/image-upload"
import { profileService } from "@/app/lib/profile-service"

const userNFTs = [
  {
    id: 1,
    title: "My Cosmic Creation",
    creator: "You",
    price: "2.5 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Personal Collection",
    blockchain: "Ethereum",
    rarity: "Legendary",
  },
  {
    id: 2,
    title: "Digital Masterpiece",
    creator: "You",
    price: "1.8 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Art Series",
    blockchain: "Polygon",
    rarity: "Rare",
  },
]

const likedNFTs = [
  {
    id: 3,
    title: "Quantum Essence",
    creator: "FutureForge",
    price: "3.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Quantum Realm",
    blockchain: "Solana",
    rarity: "Epic",
  },
  {
    id: 4,
    title: "Neon Genesis",
    creator: "TechnoMystic",
    price: "0.9 ETH",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Genesis Collection",
    blockchain: "Ethereum",
    rarity: "Common",
  },
]

function EditProfileModal({
  isOpen,
  onClose,
  userProfile,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  userProfile: any
  onSave: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    displayName: userProfile?.displayName || "",
    bio: userProfile?.bio || "",
    website: userProfile?.website || "",
    twitter: userProfile?.twitter || "",
    instagram: userProfile?.instagram || "",
    discord: userProfile?.discord || "",
    email: userProfile?.email || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userProfile?.avatar || null)
  const [coverPreview, setCoverPreview] = useState<string | null>(userProfile?.coverImage || null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update profile data
      onSave(formData)

      // Update images if changed
      if (avatarFile && avatarPreview) {
        await profileService.updateProfileImage("avatar", avatarFile, avatarPreview)
      }
      if (coverFile && coverPreview) {
        await profileService.updateProfileImage("coverImage", coverFile, coverPreview)
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-purple-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Images */}
            <div className="space-y-4">
              <ImageUpload
                currentImage={coverPreview}
                onImageChange={(file, previewUrl) => {
                  setCoverFile(file)
                  setCoverPreview(previewUrl)
                }}
                type="cover"
              />

              <ImageUpload
                currentImage={avatarPreview}
                onImageChange={(file, previewUrl) => {
                  setAvatarFile(file)
                  setAvatarPreview(previewUrl)
                }}
                type="avatar"
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username *
                </Label>
                <Input
                  id="username"
                  placeholder="@username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-gray-300">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  placeholder="Your display name"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[100px]"
                maxLength={500}
              />
              <div className="text-xs text-gray-400 text-right">{formData.bio.length}/500 characters</div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-300">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-gray-300">
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    placeholder="@username"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-gray-300">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="@username"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                    className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discord" className="text-gray-300">
                    Discord
                  </Label>
                  <Input
                    id="discord"
                    placeholder="username#1234"
                    value={formData.discord}
                    onChange={(e) => handleInputChange("discord", e.target.value)}
                    className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Preview */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
                  onClick={() => {
                    // This would simulate a mint transaction
                    toast({
                      title: "Demo Transaction",
                      description: "Simulated mint transaction added to your profile",
                    })
                  }}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Simulate Mint
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  onClick={() => {
                    toast({
                      title: "Demo Transaction",
                      description: "Simulated buy transaction added to your profile",
                    })
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Simulate Buy
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                  onClick={() => {
                    toast({
                      title: "Demo Transaction",
                      description: "Simulated sell transaction added to your profile",
                    })
                  }}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Simulate Sell
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => {
                    toast({
                      title: "Demo Transaction",
                      description: "Simulated transfer transaction added to your profile",
                    })
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Simulate Transfer
                </Button>
              </CardContent>
            </Card>

            <Alert className="border-purple-500/30 bg-purple-500/10">
              <AlertDescription className="text-purple-300">
                <strong>Pro Tip:</strong> Complete transactions to unlock achievements and improve your profile stats!
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-purple-500/30">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProfilePageContent() {
  const [activeTab, setActiveTab] = useState("owned")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { profile, stats, isLoading, updateProfile, simulateTransaction, transactions, achievements } = useProfile()

  if (isLoading || !profile || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    )
  }

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(profile.walletAddress)
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.displayName} - OmniMint Profile`,
          text: `Check out ${profile.displayName}'s NFT collection on OmniMint`,
          url: window.location.href,
        })
      } catch (error) {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Profile link copied",
          description: "Profile link copied to clipboard",
        })
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Profile link copied",
        description: "Profile link copied to clipboard",
      })
    }
  }

  const handleSaveProfile = async (newData: any) => {
    await updateProfile(newData)
  }

  const handleSimulateTransaction = async (type: "mint" | "buy" | "sell" | "transfer") => {
    const amounts = { mint: "0.05", buy: "1.2", sell: "2.1", transfer: "0.0" }
    await simulateTransaction(type, amounts[type])
    toast({
      title: "Transaction Simulated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} transaction added to your profile`,
    })
  }

  const unlockedAchievements = achievements.filter((a) => a.unlockedAt)
  const progressAchievements = achievements.filter((a) => !a.unlockedAt && (a.progress || 0) > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div
            className="h-64 rounded-xl mb-6 bg-gradient-to-r from-purple-600/50 to-pink-600/50"
            style={{
              backgroundImage:
                profile.coverImage && profile.coverImage !== "/placeholder.svg?height=300&width=800"
                  ? `url(${profile.coverImage})`
                  : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Profile Info */}
          <div className="relative -mt-20 px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-purple-500 bg-slate-800"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-white">{profile.displayName}</h1>
                    {profile.isVerified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-2">@{profile.username}</p>
                  <p className="text-gray-300 mb-3 max-w-md">{profile.bio}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      <span className="font-mono">
                        {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1 h-auto hover:bg-purple-500/20"
                        onClick={handleCopyAddress}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinedDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                    onClick={handleShareProfile}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalTransactions}</div>
              <div className="text-sm text-gray-400">Total Transactions</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalVolume} ETH</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.nftsOwned}</div>
              <div className="text-sm text-gray-400">NFTs Owned</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.nftsCreated}</div>
              <div className="text-sm text-gray-400">NFTs Created</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-pink-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-400">{stats.totalEarnings} ETH</div>
              <div className="text-sm text-gray-400">Total Earnings</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.successfulSales}</div>
              <div className="text-sm text-gray-400">Successful Sales</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-black/40 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Quick Actions (Demo)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                onClick={() => handleSimulateTransaction("mint")}
              >
                <Palette className="w-4 h-4 mr-2" />
                Mint NFT
              </Button>
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                onClick={() => handleSimulateTransaction("buy")}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy NFT
              </Button>
              <Button
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                onClick={() => handleSimulateTransaction("sell")}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Sell NFT
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                onClick={() => handleSimulateTransaction("transfer")}
              >
                <Send className="w-4 h-4 mr-2" />
                Transfer NFT
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-black/40 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Achievements ({unlockedAchievements.length}/{achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Unlocked Achievements */}
              {unlockedAchievements.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-3">Unlocked</h4>
                  <div className="flex flex-wrap gap-3">
                    {unlockedAchievements.map((achievement) => (
                      <Badge
                        key={achievement.id}
                        className={`px-3 py-2 ${
                          achievement.rarity === "legendary"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : achievement.rarity === "epic"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : achievement.rarity === "rare"
                                ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                                : "bg-gradient-to-r from-green-400 to-emerald-500"
                        } text-white`}
                      >
                        <span className="mr-2">{achievement.icon}</span>
                        {achievement.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Achievements */}
              {progressAchievements.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-3">In Progress</h4>
                  <div className="space-y-3">
                    {progressAchievements.map((achievement) => (
                      <div key={achievement.id} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{achievement.icon}</span>
                            <span className="text-white font-medium">{achievement.title}</span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                        <Progress value={(achievement.progress! / achievement.maxProgress!) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {unlockedAchievements.length === 0 && progressAchievements.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Complete transactions to start earning achievements!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* NFT Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-purple-500/30">
            <TabsTrigger value="owned" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Owned ({stats.nftsOwned})
            </TabsTrigger>
            <TabsTrigger value="created" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Created ({stats.nftsCreated})
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Liked ({likedNFTs.length})
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Activity ({transactions.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="owned" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="created" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {transactions.length > 0 ? (
                    transactions.slice(0, 10).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              transaction.type === "mint"
                                ? "bg-green-600/20"
                                : transaction.type === "buy"
                                  ? "bg-blue-600/20"
                                  : transaction.type === "sell"
                                    ? "bg-yellow-600/20"
                                    : "bg-purple-600/20"
                            }`}
                          >
                            {transaction.type === "mint" && <Palette className="w-6 h-6 text-green-400" />}
                            {transaction.type === "buy" && <ShoppingCart className="w-6 h-6 text-blue-400" />}
                            {transaction.type === "sell" && <DollarSign className="w-6 h-6 text-yellow-400" />}
                            {transaction.type === "transfer" && <Send className="w-6 h-6 text-purple-400" />}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} -{" "}
                              {transaction.nftTitle}
                            </div>
                            <div className="text-gray-400 text-sm flex items-center gap-2">
                              <span>{transaction.timestamp.toLocaleString()}</span>
                              <Badge
                                variant={
                                  transaction.status === "confirmed"
                                    ? "default"
                                    : transaction.status === "failed"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {Number.parseFloat(transaction.amount) > 0 && (
                            <div className="text-purple-400 font-semibold">{transaction.amount} ETH</div>
                          )}
                          <div className="text-gray-400 text-sm">Gas: {transaction.gasUsed} ETH</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No transactions yet. Start by minting or buying your first NFT!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Trading Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Sale Price</span>
                    <span className="text-white">{stats.averageSalePrice} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Highest Sale</span>
                    <span className="text-white">{stats.highestSale} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-white">
                      {stats.totalTransactions > 0
                        ? Math.round((stats.successfulSales / stats.totalTransactions) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Gas Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Gas Spent</span>
                    <span className="text-white">{stats.gasSpent} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Gas per TX</span>
                    <span className="text-white">
                      {stats.totalTransactions > 0
                        ? (Number.parseFloat(stats.gasSpent) / stats.totalTransactions).toFixed(6)
                        : "0.000000"}{" "}
                      ETH
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Portfolio Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI</span>
                    <span className="text-green-400">
                      {stats.totalVolume !== "0.0"
                        ? `+${Math.round((Number.parseFloat(stats.totalEarnings) / Number.parseFloat(stats.totalVolume)) * 100)}%`
                        : "0%"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Days</span>
                    <span className="text-white">
                      {Math.floor((new Date().getTime() - profile.joinedDate.getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userProfile={profile}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  )
}

export default function ProfilePageClient() {
  return <ProfilePageContent />
}
