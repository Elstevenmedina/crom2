import { motion } from 'framer-motion'
import styles from './CategoryBanner.module.css'

function CategoryBanner() {
  return (
    <section className={styles.section} style={{ overflowX: 'hidden' }}>
      {/* Lado izquierdo — Imagen del producto */}
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/assets/Home/image_lonchera.png"
          alt="Lonchera CROM"
          className={styles.productImg}
        />
      </motion.div>

      {/* Lado derecho — Título y descripción */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>LONCHERAS</h2>
          <p className={styles.description}>
            Diseñados para responder a las necesidades
            reales de estudiantes, familias y usuarios activos.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default CategoryBanner
