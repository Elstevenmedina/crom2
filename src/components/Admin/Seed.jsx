import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import styles from './Seed.module.css'

function Seed() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    setLoading(true)

    try {
      if (!supabase) {
        throw new Error('Supabase no está configurado. Verifica las variables de entorno.')
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Usuario administrador creado exitosamente. Revisa tu correo para confirmar la cuenta si es necesario.',
      })
      setEmail('')
      setPassword('')
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Error al crear el usuario.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.seedPage}>
      <div className={styles.seedCard}>
        <div className={styles.header}>
          <img src="/assets/Home/logo.png" alt="CROM" className={styles.logo} />
          <h1 className={styles.title}>Crear Administrador</h1>
          <p className={styles.subtitle}>
            Crea el primer usuario administrador para el panel de CROM.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {message.text && (
            <div className={`${styles.message} ${message.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
              {message.text}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="seed-email" className={styles.label}>Correo electrónico</label>
            <input
              id="seed-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="admin@crom.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="seed-password" className={styles.label}>Contraseña</label>
            <input
              id="seed-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creando...' : 'Crear Administrador'}
          </button>
        </form>

        <div className={styles.footer}>
          <button
            onClick={() => navigate('/login')}
            className={styles.linkBtn}
          >
            ← Ir al Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Seed
