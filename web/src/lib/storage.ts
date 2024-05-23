export const storage = {
  setUserId: (userId: number) => {
    window.localStorage.setItem('projetobd:userId', String(userId))
  },

  getUserId: () => {
    const userId = window.localStorage.getItem('projetobd:userId')

    return userId ? Number(userId) : null
  },

  clearUserId: () => {
    window.localStorage.removeItem('projetobd:userId')
  }
}
