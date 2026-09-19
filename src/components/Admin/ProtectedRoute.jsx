import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, checkStatus, logout } from '../../lib/auth'

function ProtectedRoute() {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const validate = async () => {
      if (!isAuthenticated()) {
        if (!cancelled) setLoading(false)
        return
      }

      // El token puede haber expirado; el backend lo valida y devuelve uno nuevo
      try {
        await checkStatus()
        if (!cancelled) setAuthorized(true)
      } catch {
        logout()
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    validate()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Cargando...</p>
      </div>
    )
  }

  if (!authorized) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
