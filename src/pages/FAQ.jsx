import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import styles from './FAQ.module.css'

const faqData = [
    {
        id: 1,
        question: 'Modelo mayorista exclusivo',
        answer: 'CROM es una marca que opera exclusivamente bajo el modelo de venta al por mayor. No realizamos ventas directas al consumidor final; nuestros productos están destinados a distribuidores, tiendas y aliados comerciales.'
    },
    {
        id: 2,
        question: '¿Cómo distribuir productos CROM?',
        answer: 'Si estás interesado en distribuir productos CROM, puedes contactarnos a través de nuestros canales oficiales o completar nuestro formulario de registro para distribuidores. Nuestro equipo comercial evaluará tu solicitud y te brindará información sobre los requisitos, condiciones de compra al por mayor y el proceso para convertirte en distribuidor autorizado.'
    },
    {
        id: 3,
        question: '¿CROM vende directamente al consumidor final?',
        answer: 'No. CROM no vende al consumidor final. Todas nuestras ventas se realizan únicamente a través de distribuidores y comercios autorizados.'
    },
    {
        id: 4,
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos transferencias bancarias internacionales y otros métodos de pago seguros acordados previamente con nuestro equipo comercial durante el proceso de compra mayorista.'
    }
]

// Animaciones globales
const headerAnim = {
    hidden: { opacity: 0, y: -40, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
}

const searchAnim = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } }
}

// Stagger para que las preguntas bajen como dominó
const listStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.4
        }
    }
}

const itemStagger = {
    hidden: { opacity: 0, y: 30, x: -20 },
    visible: { opacity: 1, y: 0, x: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
}

function FAQ() {
    const [openId, setOpenId] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id)
    }

    const filteredFaq = faqData.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className={styles.pageContainer} style={{ overflowX: 'hidden' }}>
            <SEO
                title="Preguntas Frecuentes"
                description="Resuelve tus dudas sobre mochilas, bolsos, loncheras y cartucheras CROM. Garant\u00eda, materiales, env\u00edos y m\u00e1s."
                path="/faq"
            />
            {/* Título */}
            <motion.div
                className={styles.titleSection}
                initial="hidden"
                animate="visible"
                variants={headerAnim}
            >
                <h1 className={styles.pageTitle}>CENTRO DE AYUDA</h1>
            </motion.div>

            {/* Buscador y Hero */}
            <motion.div
                className={styles.heroWrapper}
                initial="hidden"
                animate="visible"
                variants={searchAnim}
            >
                <div className={styles.bgImage} />
                <div className={styles.content}>
                    <h2 className={styles.searchLabel}>Buscador</h2>
                    <motion.input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar pregunta..."
                        value={searchQuery}
                        whileFocus={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(255, 0, 0, 0.4)" }}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setOpenId(null)
                        }}
                    />
                </div>
            </motion.div>

            {/* Lista FAQ (El Acordeón) */}
            <div className={styles.faqSection}>
                {filteredFaq.length > 0 ? (
                    <motion.div
                        className={styles.faqGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={listStagger}
                    >
                        {filteredFaq.map((item) => (
                            <motion.div
                                variants={itemStagger}
                                key={item.id}
                                className={styles.faqItem}
                                layout // Para que se acomoden fluidamente al abrirse
                            >
                                <motion.div
                                    className={`${styles.questionBox} ${openId === item.id ? styles.active : ''}`}
                                    onClick={() => toggleFAQ(item.id)}
                                    whileHover={{ scale: 1.01, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    layout
                                >
                                    {item.question}
                                </motion.div>

                                <AnimatePresence>
                                    {openId === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            style={{ overflow: "hidden" }} // Previene salto visual en textos largos
                                        >
                                            <p className={styles.answerText}>
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={styles.noResults}
                    >
                        No se encontraron resultados para "{searchQuery}"
                    </motion.p>
                )}
            </div>
        </div>
    )
}

export default FAQ
