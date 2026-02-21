import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import styles from './Contacto.module.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_USER = import.meta.env.VITE_EMAILJS_TEMPLATE_USER
const EMAILJS_TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// 1. Hero Animation: Blurred DropDown
const blurDrop = {
    hidden: { opacity: 0, y: -50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
}

// 2. Cards Animation: 3D Flip Entry
const cardFlip = {
    hidden: { opacity: 0, rotateX: 90, z: -100 },
    visible: { opacity: 1, rotateX: 0, z: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }
}

// 3. Form Animation: Side Slide with Staggered Inputs
const formSlide = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", damping: 20, stiffness: 100, staggerChildren: 0.1, delayChildren: 0.3 }
    }
}

const inputPop = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
}

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
        <div className={styles.pageContainer} style={{ overflowX: 'hidden', perspective: '1000px' }}>
            {/* Hero Section */}
            <motion.section
                className={styles.hero}
                initial="hidden"
                animate="visible"
                variants={blurDrop}
            >
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Contáctanos</h1>
                    <p className={styles.subtitle}>
                        ¿Necesitas información sobre morrales, distribución o alianzas comerciales?<br />
                        Escríbenos y te respondemos en 24 horas.
                    </p>
                </div>
            </motion.section>

            {/* Opciones de Contacto */}
            <section className={styles.contactOptions}>
                <div className={styles.optionsContainer}>
                    {/* WhatsApp */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardFlip}
                        className={styles.contactCard}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className={styles.iconWrapper}>
                            <motion.img
                                src="/assets/contactanos/llamar (2).png"
                                alt="WhatsApp"
                                className={styles.contactIcon}
                                whileHover={{ rotate: 15, scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </div>
                        <h2 className={styles.contactTitle}>Escríbenos al Whatsapp</h2>
                        <p className={styles.contactText}>
                            Habla directamente con nuestro equipo comercial especializado. Te asesoramos sobre distribución, stock disponible y precios mayoristas al instante.
                        </p>
                        <motion.a
                            href="tel:+50763365987"
                            className={styles.contactLink}
                            whileHover={{ x: 5, color: "#FF0000" }}
                        >
                            +507 6336-5987
                        </motion.a>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardFlip}
                        className={styles.contactCard}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className={styles.iconWrapper}>
                            <motion.img
                                src="/assets/contactanos/correo-electronico.png"
                                alt="Email"
                                className={styles.contactIcon}
                                whileHover={{ rotate: -15, scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </div>
                        <h2 className={styles.contactTitle}>Escríbenos al Email</h2>
                        <p className={styles.contactText}>
                            Envíanos tu consulta sobre distribuidores internacionales, nuevos modelos de mochilas escolares o disponibilidad de loncheras.
                        </p>
                        <motion.a
                            href="mailto:ventas@hamzisa.com"
                            className={styles.contactLink}
                            whileHover={{ x: 5, color: "#FF0000" }}
                        >
                            ventas@hamzisa.com
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Formulario Distribuidores */}
            <section className={styles.formSection}>
                <motion.div
                    className={styles.formCard}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={formSlide}
                >
                    <div className={styles.formBody}>
                        <motion.h2 variants={inputPop} className={styles.formTitle}>
                            Forma parte de nuestros<br />
                            distribuidores internacionales
                        </motion.h2>

                        {status.text && (
                            <motion.div variants={inputPop} className={`${styles.statusMessage} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                                {status.text}
                            </motion.div>
                        )}

                        <form className={styles.formGrid} onSubmit={handleSubmit}>
                            <motion.input
                                variants={inputPop}
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Nombre y Apellido*"
                                className={styles.inputField}
                                required
                            />
                            <motion.input
                                variants={inputPop}
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Nombre de la empresa*"
                                className={styles.inputField}
                                required
                            />

                            <motion.input
                                variants={inputPop}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo*"
                                className={styles.inputField}
                                required
                            />
                            <motion.select
                                variants={inputPop}
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
                            </motion.select>

                            <motion.input
                                variants={inputPop}
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Teléfono*"
                                className={styles.inputField}
                                required
                            />
                            <motion.input
                                variants={inputPop}
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="País*"
                                className={styles.inputField}
                                required
                            />

                            <motion.input
                                variants={inputPop}
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="Sitio Web"
                                className={styles.inputField}
                            />
                            <motion.input
                                variants={inputPop}
                                type="text"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Mensaje*"
                                className={styles.inputField}
                                required
                            />

                            <motion.div variants={inputPop} className={styles.formFooterInline}>
                                <p className={styles.footerText}>
                                    Te respondemos en máximo 24 horas<br />
                                    con toda la información.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(255,0,0,0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Enviar'}
                                </motion.button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}

export default Contacto
