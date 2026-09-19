import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import styles from './Seed.module.css'

function Seed() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // El backend solo permite ejecutar el seed si no existe ningun usuario,
  // asi que esta pantalla queda inutilizable una vez inicializado el sistema.
  const handleSeed = async () => {
    setMessage({ type: '', text: '' })
    setLoading(true)

    try {
      const result = await api.post('/seed')
      setMessage({
        type: 'success',
        text: `Sistema inicializado. Usuario administrador: ${result.adminEmail}. Ya puedes iniciar sesión.`,
      })
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Error al inicializar el sistema.',
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
          <h1 className={styles.title}>Inicializar Sistema</h1>
          <p className={styles.subtitle}>
            Crea el usuario administrador, las categorías iniciales y la configuración
            por defecto. Solo funciona con la base de datos vacía.
          </p>
        </div>

        <div className={styles.form}>
          {message.text && (
            <div className={`${styles.message} ${message.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
              {message.text}
            </div>
          )}

          <button onClick={handleSeed} className={styles.submitBtn} disabled={loading}>
            {loading ? 'Inicializando...' : 'Inicializar Sistema'}
          </button>
        </div>

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
