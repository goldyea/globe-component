"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  user_id: string
  username: string | null
  full_name: string | null
  company: string | null
  isAdmin: boolean
  credits: number // Changed to a single credits field
  created_at: string
  updated_at: string
}

interface UseUserReturn {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  isError: boolean
  error: string | null
  refetchProfile: () => void
  isAdmin: boolean
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)
    setError(null)
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

      if (authError) {
        throw new Error(authError.message)
      }
      setUser(authUser)

      if (authUser) {
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (profileError) {
          throw new Error(profileError.message)
        }
        setProfile(profileData)
      } else {
        setProfile(null)
      }
    } catch (err) {
      console.error("Error fetching user or profile:", err)
      setIsError(true)
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchUserProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile() // Re-fetch profile on auth state change
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, fetchUserProfile])

  const isAdmin = profile?.isAdmin ?? false;

  return { user, profile, isLoading, isError, error, refetchProfile: fetchUserProfile, isAdmin }
}