import { StateCreator } from 'zustand'

type User = {
  id: string
  firstName: string
  lastName: string
  username: string
}

export type AuthSlice = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  user: User | null
  setUser: (user: User) => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn })
  },
  setUser: (user) => {
    set({ user })
  },
  user: null,
})
