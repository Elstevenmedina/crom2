import { motion } from 'framer-motion'
import styles from './CategoryBanner.module.css'

function CategoryBanner() {
  const cards = [
    {
      title: 'Pensado para\nvender',
      content: 'Diseños alineados con tendencias actuales. Selección estratégica de modelos. Alta aceptación en punto de venta.',
      color: 'red'
    },
    {
      title: 'Durabilidad y\ndiseño',
      content: 'Cada producto combina resistencia, comodidad y estilo, pensado para el uso diario y múltiples escenarios.',
      color: 'red'
    },
    {
      title: 'Enfoque en\nresultados',
      content: 'Optimizamos cada detalle para que puedas ofrecer productos competitivos, con buen margen y fácil comercialización.',
      color: 'lightRed'
    },
    {
      title: 'Crecimiento en\nconjunto',
      content: 'Construimos relaciones a largo plazo, brindando soporte, continuidad y evolución constante de la marca.',
      color: 'red'
    }
  ]

  // Variantes para las animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] } // EaseOutQuad suave
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Lado izquierdo — Texto principal */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>
            Impulsamos tu<br />
            negocio con<br />
            productos que sí se venden
          </h2>
          <div className={styles.descriptionGroup}>
            <p className={styles.paragraph}>
              En Crom no solo desarrollamos mochilas y accesorios, creamos soluciones diseñadas para el movimiento real del mercado.
            </p>
            <p className={styles.paragraph}>
              Entendemos lo que buscan tus clientes y lo convertimos en productos funcionales, atractivos y listos para rotar.
            </p>
            <p className={styles.paragraph}>
              Trabajamos junto a nuestros aliados para ofrecer un portafolio confiable, adaptable y con visión comercial.
            </p>
          </div>
        </motion.div>

        {/* Lado derecho — Cuadros informativos */}
        <motion.div
          className={styles.right}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.grid}>
            {cards.map((card, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                initial="hidden"
                animate={{ y: 0, backgroundColor: "#f54c4c" }} // Forzamos el retorno al color base al salir del hover
                whileHover={{ 
                  y: -8, 
                  backgroundColor: "#d11d1d", 
                  transition: { duration: 0.2 } 
                }}
                className={`${styles.card} ${card.color === 'lightRed' ? styles.lightRed : styles.red}`}
              >
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <div className={styles.cardContent}>
                  {card.content}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryBanner


