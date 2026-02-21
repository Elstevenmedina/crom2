import { motion } from 'framer-motion'
import styles from './Showcase.module.css'

function Showcase() {
  return (
    <section className={styles.section} style={{ overflow: 'hidden' }}>
      {/* Lado izquierdo — Branding */}
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/assets/Home/crom_text.png"
          alt="CROM - The perfect choice"
          className={styles.brandImg}
        />
      </motion.div>

      {/* Lado derecho — Imagen producto sobre fondo rojo */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.redBg} />
        <div className={styles.productWrapper}>
          <img
            src="/assets/Home/cartuchera.png"
            alt="Cartuchera CROM"
            className={styles.productImg}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Showcase
