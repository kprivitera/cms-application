import { StateCreator } from 'zustand'

export type AuthSlice = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn })
  },
})
