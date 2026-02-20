import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './ContactMessages.module.css'

function ContactMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching messages:', error)
    } else {
      setMessages(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return <div className={styles.loading}>Cargando mensajes...</div>
  }

  if (selectedMessage) {
    return (
      <div className={styles.detail}>
        <div className={styles.detailHeader}>
          <button
            onClick={() => setSelectedMessage(null)}
            className={styles.backBtn}
          >
            ← Volver a mensajes
          </button>
          <span className={styles.detailDate}>
            {formatDate(selectedMessage.created_at)}
          </span>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailGrid}>
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>Nombre</span>
              <span className={styles.detailValue}>{selectedMessage.full_name}</span>
            </div>
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>Empresa</span>
              <span className={styles.detailValue}>{selectedMessage.company || '—'}</span>
            </div>
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>Correo</span>
              <span className={styles.detailValue}>{selectedMessage.email}</span>
            </div>
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>Teléfono</span>
              <span className={styles.detailValue}>{selectedMessage.phone || '—'}</span>
            </div>
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>Tipo</span>
              <span className={styles.detailValue}>{selectedMessage.type || '—'}</span>
            </div>
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>País</span>
              <span className={styles.detailValue}>{selectedMessage.country || '—'}</span>
            </div>
          </div>
          <div className={styles.detailMessage}>
            <span className={styles.detailLabel}>Mensaje</span>
            <p className={styles.messageText}>{selectedMessage.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.count}>{messages.length} mensaje(s)</p>
      </div>

      {messages.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay mensajes de contacto.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={styles.messageCard}
              onClick={() => setSelectedMessage(msg)}
            >
              <div className={styles.messageTop}>
                <div className={styles.messageInfo}>
                  <h3 className={styles.messageName}>{msg.full_name}</h3>
                  <p className={styles.messageEmail}>{msg.email}</p>
                </div>
                <span className={styles.messageDate}>
                  {formatDate(msg.created_at)}
                </span>
              </div>
              {msg.company && (
                <p className={styles.messageCompany}>{msg.company}</p>
              )}
              <p className={styles.messagePreview}>
                {msg.message && msg.message.length > 120
                  ? msg.message.substring(0, 120) + '...'
                  : msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContactMessages
