import { storage } from '@/lib/storage'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    setUserId(storage.getUserId())
  }, [])

  function signOut() {
    setUserId(null)
    storage.clearUserId()
  }

  function signIn(userId: number) {
    setUserId(userId)
    storage.setUserId(userId)
  }

  return {
    signOut,
    signIn,
    userId
  }
}
