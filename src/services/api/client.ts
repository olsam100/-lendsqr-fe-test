export const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

export async function client(endpoint: string, config: RequestInit = {}) {
  const conf: RequestInit = {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  }

  try {
    const response = await window.fetch(apiUrl + endpoint, conf)
    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  } catch (error) {
    console.error('API request failed:', error)
    return Promise.reject({
      message: 'Network error. Please check your connection and try again.',
    })
  }
}
