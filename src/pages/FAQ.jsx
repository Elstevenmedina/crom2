import { useState } from 'react'
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
        <div className={styles.pageContainer}>
            <div className={styles.titleSection}>
                <h1 className={styles.pageTitle}>CENTRO DE AYUDA</h1>
            </div>

            <div className={styles.heroWrapper}>
                <div className={styles.bgImage} />
                <div className={styles.content}>
                    <h2 className={styles.searchLabel}>Buscador</h2>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar pregunta..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setOpenId(null)
                        }}
                    />
                </div>
            </div>

            <div className={styles.faqSection}>
                {filteredFaq.length > 0 ? (
                    <div className={styles.faqGrid}>
                        {filteredFaq.map((item) => (
                            <div key={item.id} className={styles.faqItem}>
                                <div
                                    className={`${styles.questionBox} ${openId === item.id ? styles.active : ''}`}
                                    onClick={() => toggleFAQ(item.id)}
                                >
                                    {item.question}
                                </div>
                                {openId === item.id && (
                                    <p className={styles.answerText}>
                                        {item.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.noResults}>No se encontraron resultados para "{searchQuery}"</p>
                )}
            </div>
        </div>
    )
}

export default FAQ
