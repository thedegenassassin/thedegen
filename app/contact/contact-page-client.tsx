"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  MessageCircle,
  Phone,
  Clock,
  Send,
  Twitter,
  Github,
  Linkedin,
  HelpCircle,
  Users,
  Briefcase,
  FileText,
} from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    contact: "support@omnimint.io",
    responseTime: "Within 24 hours",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team",
    contact: "Available 24/7",
    responseTime: "Instant response",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us directly",
    contact: "+1 (555) 123-4567",
    responseTime: "Mon-Fri 9AM-6PM UTC",
    color: "from-purple-500 to-pink-500",
  },
]

const departments = [
  {
    icon: HelpCircle,
    title: "General Support",
    email: "support@omnimint.io",
    description: "Technical issues, account help, and general questions",
  },
  {
    icon: Briefcase,
    title: "Business & Partnerships",
    email: "partnerships@omnimint.io",
    description: "Business inquiries, partnerships, and collaborations",
  },
  {
    icon: FileText,
    title: "Press & Media",
    email: "press@omnimint.io",
    description: "Press releases, media kits, and interview requests",
  },
  {
    icon: Users,
    title: "Community",
    email: "community@omnimint.io",
    description: "Community events, feedback, and suggestions",
  },
]

const socialLinks = [
  { icon: Twitter, name: "Twitter", url: "https://x.com/mixedcrypto702" },
  { icon: MessageCircle, name: "Discord", url: "https://discord.gg/omnimint" },
  { icon: Github, name: "GitHub", url: "https://github.com/omnimint" },
  { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/company/omnimint" },
]

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "",
    message: "",
    priority: "medium",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of the channels below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <Card
                key={index}
                className="bg-black/40 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                  <p className="text-purple-400 font-medium mb-2">{method.contact}</p>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {method.responseTime}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleInputChange("department", value)}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/30">
                          <SelectItem value="support">General Support</SelectItem>
                          <SelectItem value="business">Business & Partnerships</SelectItem>
                          <SelectItem value="press">Press & Media</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/30">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Departments */}
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept, index) => {
                    const IconComponent = dept.icon
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">{dept.title}</h4>
                          <p className="text-purple-400 text-xs mb-1">{dept.email}</p>
                          <p className="text-gray-400 text-xs">{dept.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Office Info */}
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Office Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">Business Hours</p>
                      <p className="text-gray-400 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM UTC
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        asChild
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <IconComponent className="w-4 h-4 mr-2" />
                          {social.name}
                        </a>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
