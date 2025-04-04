import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface RootState {
    // App-wide state
    isLoading: boolean
    theme: 'light' | 'dark'
    // Actions
    setIsLoading: (loading: boolean) => void
    setTheme: (theme: 'light' | 'dark') => void
}

const createStore = (process.env.NODE_ENV === 'development' ? devtools : (fn: any) => fn)

export const useRootStore = create<RootState>()(
    createStore(
        persist(
            (set) => ({
                isLoading: false,
                theme: 'light',
                setIsLoading: (loading) => set({ isLoading: loading }),
                setTheme: (theme) => set({ theme }),
            }),
            {
                name: 'root-store',
            }
        )
    )
) 