import { useCallback, useState } from 'react'

export function useAPILoading() {
  const [isLoading, setIsLoading] = useState(false)

  const callAPI = useCallback(async <ExpectedResult>(callback: () => Promise<ExpectedResult | null>) => {
    setIsLoading(true)

    const response = await callback()
    setIsLoading(false)
    return response
  }, [])

  return {
    isLoading,
    callAPI,
  }
}
