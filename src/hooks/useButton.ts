import { useCallback, useState } from 'react'

export const useButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async <ExpectedResult>(callback: () => Promise<ExpectedResult | null>) => {
    setIsLoading(true)

    const response = await callback()
    setIsLoading(false)
    return response
  }, [])

  return {
    isLoading,
    handleClick,
  }
}
