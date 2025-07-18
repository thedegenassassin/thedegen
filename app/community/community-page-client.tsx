"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Twitter,
  Github,
  Calendar,
  Trophy,
  ExternalLink,
  Heart,
  Star,
  TrendingUp,
  Globe,
  Linkedin,
} from "lucide-react"

const socialPlatforms = [
  {
    name: "Discord",
    icon: MessageCircle,
    description: "Join our Discord server for real-time discussions, support, and community events",
    members: "25,000+",
    link: "https://discord.gg/omnimint",
    color: "from-indigo-500 to-purple-600",
    active: true,
  },
  {
    name: "Twitter",
    icon: Twitter,
    description: "Follow us for the latest updates, announcements, and community highlights",
    members: "50,000+",
    link: "https://x.com/mixedcrypto702",
    color: "from-blue-400 to-blue-600",
    active: true,
  },
  {
    name: "GitHub",
    icon: Github,
    description: "Contribute to our open-source projects and help build the future of NFTs",
    members: "1,200+",
    link: "https://github.com/omnimint",
    color: "from-gray-600 to-gray-800",
    active: true,
  },
  {
    name: "Telegram",
    icon: MessageCircle,
    description: "Join our Telegram group for quick updates and community chat",
    members: "15,000+",
    link: "https://t.me/omnimint",
    color: "from-blue-500 to-cyan-500",
    active: true,
  },
]

const upcomingEvents = [
  {
    title: "NFT Creator Workshop",
    date: "Dec 15, 2024",
    time: "2:00 PM UTC",
    type: "Workshop",
    description: "Learn advanced NFT creation techniques and best practices",
  },
  {
    title: "Community AMA",
    date: "Dec 20, 2024",
    time: "6:00 PM UTC",
    type: "AMA",
    description: "Ask the OmniMint team anything about the platform and roadmap",
  },
  {
    title: "Holiday NFT Contest",
    date: "Dec 25, 2024",
    time: "All Day",
    type: "Contest",
    description: "Create holiday-themed NFTs and win amazing prizes",
  },
]

const communityGuidelines = [
  "Be respectful and kind to all community members",
  "No spam, self-promotion, or off-topic content",
  "Help others and share knowledge freely",
  "Report any suspicious activity or scams",
  "Follow platform-specific rules and guidelines",
  "Respect intellectual property and creator rights",
]

const socialLinks = [
  { icon: Twitter, name: "Twitter", url: "https://x.com/mixedcrypto702" },
  { icon: MessageCircle, name: "Discord", url: "https://discord.gg/omnimint" },
  { icon: Github, name: "GitHub", url: "https://github.com/omnimint" },
  { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/company/omnimint" },
]

export default function CommunityPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join Our Community
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with creators, collectors, and traders from around the world. Be part of the future of NFTs.
          </p>
        </div>

        {/* Social Platforms */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Connect With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {socialPlatforms.map((platform, index) => {
              const IconComponent = platform.icon
              return (
                <Card
                  key={index}
                  className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                          <Badge className="bg-green-500/20 text-green-400 text-xs">{platform.members} members</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{platform.description}</p>
                        <Button
                          variant="outline"
                          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 group-hover:border-purple-400"
                          asChild
                        >
                          <a href={platform.link} target="_blank" rel="noopener noreferrer">
                            Join {platform.name}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card
                  key={index}
                  className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                          <Badge className="bg-purple-500/20 text-purple-400 text-xs">{event.type}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Globe className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                      >
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Community Guidelines</h2>
            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {communityGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">{guideline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Highlights */}
            <Card className="bg-black/40 border-purple-500/30 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Community Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Creator of the Month</p>
                      <p className="text-gray-400 text-xs">@DigitalArtist</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Top Collection</p>
                      <p className="text-gray-400 text-xs">Cosmic Dreams</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Community Hero</p>
                      <p className="text-gray-400 text-xs">@HelpfulUser</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Join?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Become part of our vibrant community and help shape the future of NFTs. Connect, learn, and grow with
              fellow creators and collectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discord
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                <Twitter className="w-4 h-4 mr-2" />
                Follow on Twitter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
