import { UserInfo, storage } from '@/lib/storage'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    setUserInfo(storage.getUserInfo())
  }, [])

  function signOut() {
    setUserInfo(null)
    storage.clearUserInfo()
  }

  function signIn(userInfo: UserInfo) {
    setUserInfo(userInfo)
    storage.setUserInfo(userInfo)
  }

  return {
    signOut,
    signIn,
    userInfo
  }
}
