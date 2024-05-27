export type UserInfo = {
  userId: number
  role: string
}

export const storage = {
  setUserInfo: (userInfo: UserInfo) => {
    window.localStorage.setItem('projetobd:userInfo', JSON.stringify(userInfo))
  },

  getUserInfo: (): UserInfo | null => {
    const userInfo = window.localStorage.getItem('projetobd:userInfo')

    return userInfo ? JSON.parse(userInfo) : null
  },

  clearUserInfo: () => {
    window.localStorage.removeItem('projetobd:userInfo')
  }
}
