import { create } from 'zustand'

export const useshopApp = create((set) => ({
  token: [],
  removeAllBears: () => set({ token: [] }),
  updateToken: token => set({ token }),
}))