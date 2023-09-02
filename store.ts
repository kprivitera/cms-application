import { create } from 'zustand'

import { AuthSlice, createAuthSlice } from './slices/auth'

type StoreState = AuthSlice

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
}))
