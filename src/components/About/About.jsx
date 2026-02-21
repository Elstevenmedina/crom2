import { motion } from 'framer-motion'
import styles from './About.module.css'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

function About() {
  return (
    <section id="nosotros" className={styles.section} style={{ overflow: 'hidden' }}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className={styles.title}>Nuestra Historia</motion.h2>

        <motion.p variants={fadeInUp} className={styles.intro}>
          Crom es una marca con más de 30 años de trayectoria en el mercado, construida
          sobre la experiencia, la constancia y el compromiso con la calidad. Desde sus inicios,
          nació con un propósito claro: desarrollar mochilas resistentes y funcionales que
          acompañen a las personas en su rutina diaria, especialmente en el entorno
          escolar y urbano.
        </motion.p>

        <motion.div variants={staggerContainer} className={styles.features}>
          {/* Autonomía */}
          <motion.div variants={staggerItem} className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <motion.img
                whileHover={{ rotate: 5, scale: 1.1 }}
                src="/assets/Home/icon_2.png"
                alt="Autonomía"
                className={styles.icon}
              />
            </div>
            <div className={styles.featureText}>
              <h3>Autonomía</h3>
              <p>
                Crom selecciona y desarrolla sus propios modelos,
                trabajando directamente con sus fábricas.
              </p>
            </div>
          </motion.div>

          {/* Expansión */}
          <motion.div variants={staggerItem} className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <motion.img
                whileHover={{ rotate: -5, scale: 1.1 }}
                src="/assets/Home/icon_1.png"
                alt="Expansión"
                className={styles.icon}
                style={{ marginTop: '1.2rem' }}
              />
            </div>
            <div className={styles.featureText}>
              <h3>Expansión</h3>
              <p>
                Gracias a su experiencia y estructura, Crom tiene
                alcance internacional en los países donde opera
                Bebesitos, atendiendo mercados regionales con
                eficiencia.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <motion.a
            href="#nosotros"
            className={styles.cta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONOCE MÁS
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
