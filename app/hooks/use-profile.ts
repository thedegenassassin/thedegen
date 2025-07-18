"use client"

import { useState, useEffect } from "react"
import { profileService, type UserProfile, type UserStats } from "@/app/lib/profile-service"

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial load
    setProfile(profileService.getProfile())
    setStats(profileService.getStats())
    setIsLoading(false)

    // Subscribe to updates
    const unsubscribe = profileService.subscribe((newProfile, newStats) => {
      setProfile(newProfile)
      setStats(newStats)
    })

    return unsubscribe
  }, [])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    await profileService.updateProfile(updates)
  }

  const simulateTransaction = async (type: "mint" | "buy" | "sell" | "transfer", amount?: string) => {
    await profileService.simulateTransaction(type, amount)
  }

  return {
    profile,
    stats,
    isLoading,
    updateProfile,
    simulateTransaction,
    transactions: profileService.getTransactions(),
    achievements: profileService.getAchievements(),
  }
}
