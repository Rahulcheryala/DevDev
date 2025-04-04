import { useEffect } from 'react'
import { useRootStore } from './createRootStore'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const { isLoading, setIsLoading } = useRootStore()

    useEffect(() => {
        // Set loading to false when component mounts, indicating hydration is complete
        setIsLoading(false)

        // Cleanup when component unmounts
        return () => {
            setIsLoading(true)
        }
    }, [setIsLoading])

    if (isLoading) {
        return null // or a loading spinner/skeleton
    }

    return children
} 