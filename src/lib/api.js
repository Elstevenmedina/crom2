const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const TOKEN_KEY = 'crom_token'

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    /* modo privado: la sesion solo dura lo que dure la pestana */
  }
}

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignorar */
  }
}

// Nest devuelve { message, error, statusCode }, y message puede ser un array
const extractError = (payload, status) => {
  if (!payload) return `Error ${status}`
  if (Array.isArray(payload.message)) return payload.message.join('. ')
  return payload.message || payload.error || `Error ${status}`
}

const request = async (path, { method = 'GET', body, isFormData = false } = {}) => {
  const headers = {}
  const token = getToken()

  if (token) headers.Authorization = `Bearer ${token}`
  if (!isFormData && body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 401) {
    clearToken()
    throw new Error('Sesión expirada. Vuelve a iniciar sesión.')
  }

  if (response.status === 204) return null

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(extractError(payload, response.status))
  }

  return payload
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path) => request(path, { method: 'DELETE' }),

  // Sube un archivo a Cloudinary a traves del backend. Devuelve { url, publicId }
  upload: (folder, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request(`/uploads/${folder}`, {
      method: 'POST',
      body: formData,
      isFormData: true,
    })
  },
}
