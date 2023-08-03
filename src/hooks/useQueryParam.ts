import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export function useQueryParam(key: string) {
  const { push, asPath } = useRouter()
  const [param, setParam] = useState<string | null>(new URLSearchParams(asPath.split('?').slice(1).join('?')).get(key))

  const changeParam = useCallback(
    (id: string) => {
      const url = new URL(window.location.href)
      url.searchParams.set(key, id)
      setParam(id)
      push(url, undefined, { shallow: true })
    },
    [key, push]
  )

  useEffect(() => {
    setParam(new URLSearchParams(asPath.split('?').slice(1).join('?')).get(key))
  }, [asPath, key])

  return [param, changeParam] as const
}
