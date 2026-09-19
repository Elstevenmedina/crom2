import { api, setToken, clearToken, getToken } from './api'

const USER_KEY = 'crom_user'

const storeUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    /* ignorar */
  }
}

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export const isAuthenticated = () => !!getToken()

export const login = async (email, password) => {
  const { user, token } = await api.post('/auth/login', { email, password })
  setToken(token)
  storeUser(user)
  return user
}

// Valida el token contra el backend y lo renueva. Se llama al abrir el panel.
export const checkStatus = async () => {
  const { user, token } = await api.get('/auth/check-status')
  setToken(token)
  storeUser(user)
  return user
}

export const logout = () => {
  clearToken()
  try {
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignorar */
  }
}
