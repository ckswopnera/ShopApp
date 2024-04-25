import { create } from 'zustand'

export const useshopApp = create((set) => ({
    token: [],
    removeAllBears: () => set({ token: [], searchBar: false }),
    updateToken: token => set({ token }),
    searchBar: false,
    updateSearchBar: searchBar => set({ searchBar }),
}))