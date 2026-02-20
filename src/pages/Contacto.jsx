import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import styles from './Contacto.module.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_USER = import.meta.env.VITE_EMAILJS_TEMPLATE_USER
const EMAILJS_TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function Contacto() {
    const [formData, setFormData] = useState({
        full_name: '',
        company: '',
        email: '',
        type: '',
        phone: '',
        country: '',
        website: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({ type: '', text: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', text: '' })

        try {
            // 1. Guardar en Supabase
            if (supabase) {
                const { error: dbError } = await supabase
                    .from('contact_submissions')
                    .insert([{
                        full_name: formData.full_name,
                        company: formData.company,
                        email: formData.email,
                        type: formData.type,
                        phone: formData.phone,
                        country: formData.country,
                        message: formData.message,
                    }])

                if (dbError) {
                    console.error('Error saving to Supabase:', dbError)
                }
            }

            // 2. Enviar email de confirmación al usuario
            if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_TEMPLATE_USER) {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_USER,
                    {
                        to_name: formData.full_name,
                        to_email: formData.email,
                        company: formData.company,
                        message: formData.message,
                    },
                    EMAILJS_PUBLIC_KEY
                )
            }

            // 3. Enviar notificación al admin
            if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_TEMPLATE_ADMIN && supabase) {
                // Obtener email de notificación del admin
                const { data: settings } = await supabase
                    .from('admin_settings')
                    .select('value')
                    .eq('key', 'contact_notification_email')
                    .single()

                const adminEmail = settings?.value

                if (adminEmail) {
                    await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ADMIN,
                        {
                            to_email: adminEmail,
                            from_name: formData.full_name,
                            from_email: formData.email,
                            company: formData.company,
                            type: formData.type,
                            phone: formData.phone,
                            country: formData.country,
                            message: formData.message,
                        },
                        EMAILJS_PUBLIC_KEY
                    )
                }
            }

            setStatus({
                type: 'success',
                text: '¡Mensaje enviado exitosamente! Te responderemos en máximo 24 horas.',
            })
            setFormData({
                full_name: '',
                company: '',
                email: '',
                type: '',
                phone: '',
                country: '',
                website: '',
                message: '',
            })
        } catch (err) {
            console.error('Error sending message:', err)
            setStatus({
                type: 'error',
                text: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Contáctanos</h1>
                    <p className={styles.subtitle}>
                        ¿Necesitas información sobre morrales, distribución o alianzas comerciales?<br />
                        Escríbenos y te respondemos en 24 horas.
                    </p>
                </div>
            </section>

            {/* Opciones de Contacto */}
            <section className={styles.contactOptions}>
                <div className={styles.optionsContainer}>
                    {/* WhatsApp */}
                    <div className={styles.contactCard}>
                        <div className={styles.iconWrapper}>
                            <img
                                src="/assets/contactanos/llamar (2).png"
                                alt="WhatsApp"
                                className={styles.contactIcon}
                            />
                        </div>
                        <h2 className={styles.contactTitle}>Escríbenos al Whatsapp</h2>
                        <p className={styles.contactText}>
                            Habla directamente con nuestro equipo comercial especializado. Te asesoramos sobre distribución, stock disponible y precios mayoristas al instante.
                        </p>
                        <a href="tel:+50763365987" className={styles.contactLink}>+507 6336-5987</a>
                    </div>

                    {/* Email */}
                    <div className={styles.contactCard}>
                        <div className={styles.iconWrapper}>
                            <img
                                src="/assets/contactanos/correo-electronico.png"
                                alt="Email"
                                className={styles.contactIcon}
                            />
                        </div>
                        <h2 className={styles.contactTitle}>Escríbenos al Email</h2>
                        <p className={styles.contactText}>
                            Envíanos tu consulta sobre distribuidores internacionales, nuevos modelos de mochilas escolares o disponibilidad de loncheras.
                        </p>
                        <a href="mailto:ventas@hamzisa.com" className={styles.contactLink}>ventas@hamzisa.com</a>
                    </div>
                </div>
            </section>

            {/* Formulario Distribuidores */}
            <section className={styles.formSection}>
                <div className={styles.formCard}>
                    <div className={styles.formBody}>
                        <h2 className={styles.formTitle}>
                            Forma parte de nuestros<br />
                            distribuidores internacionales
                        </h2>

                        {status.text && (
                            <div className={`${styles.statusMessage} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                                {status.text}
                            </div>
                        )}

                        <form className={styles.formGrid} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Nombre y Apellido*"
                                className={styles.inputField}
                                required
                            />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Nombre de la empresa*"
                                className={styles.inputField}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo*"
                                className={styles.inputField}
                                required
                            />
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className={`${styles.inputField} ${styles.selectField}`}
                                required
                            >
                                <option value="">Tipo de empresa*</option>
                                <option value="retail">Retail</option>
                                <option value="wholesale">Mayorista</option>
                                <option value="other">Otro</option>
                            </select>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Teléfono*"
                                className={styles.inputField}
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="País*"
                                className={styles.inputField}
                                required
                            />

                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="Sitio Web"
                                className={styles.inputField}
                            />
                            <input
                                type="text"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Mensaje*"
                                className={styles.inputField}
                                required
                            />

                            <div className={styles.formFooterInline}>
                                <p className={styles.footerText}>
                                    Te respondemos en máximo 24 horas<br />
                                    con toda la información.
                                </p>
                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    {loading ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contacto
