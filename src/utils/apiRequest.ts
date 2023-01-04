export async function Get<P, R>(baseUrl: string, params: P): Promise<R | null> {
  try {
    const url = `${baseUrl}?${[...Object.entries(params as Record<string, unknown>)]
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`
    const res = await fetch(url)

    if (res.ok) {
      return res.json()
    }
    const { message } = await res.json()
    alert(message)
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function Post<P, R>(url: string, params: P): Promise<R | null> {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params),
    })

    if (res.ok) {
      return res.json()
    }
    const { message } = await res.json()
    alert(message)
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}
