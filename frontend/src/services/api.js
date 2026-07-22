const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong')
  }

  return data
}

export default request
