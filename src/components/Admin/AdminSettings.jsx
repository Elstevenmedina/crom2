import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import styles from './AdminSettings.module.css'

function AdminSettings() {
  const [notificationEmail, setNotificationEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const { value } = await api.get('/settings/contact_notification_email')
      setNotificationEmail(value || '')
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      await api.put('/settings/contact_notification_email', {
        value: notificationEmail,
      })

      setMessage({ type: 'success', text: 'Configuración guardada correctamente.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error al guardar.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Cargando configuración...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Notificaciones de Contacto</h2>
        <p className={styles.cardDescription}>
          Configura el correo electrónico que recibirá las notificaciones cuando
          alguien envíe un formulario de contacto.
        </p>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Correo de notificación</label>
            <input
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              className={styles.input}
              placeholder="admin@crom.com"
              required
            />
          </div>

          {message.text && (
            <div className={`${styles.message} ${message.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Configuración'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminSettings
