import { useState } from 'react'
import { api } from '../../lib/api'
import styles from './Contact.module.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await api.post('/contacts', {
        fullName: formData.name,
        email: formData.email,
        message: formData.message,
      })

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Submit error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Contáctanos</h2>
        <p className={styles.subheading}>
          ¿Tienes una pregunta o quieres comenzar? Envíanos un mensaje.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Tu mensaje"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
          {status === 'success' && (
            <p className={styles.success}>
              ¡Mensaje enviado correctamente!
            </p>
          )}
          {status === 'error' && (
            <p className={styles.error}>
              Algo salió mal. Intenta de nuevo en unos minutos.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
