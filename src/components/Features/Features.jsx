import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './Features.module.css'

const collections = [
  {
    name: 'Bolsos',
    image: '/assets/Home/ellipse_1.png',
  },
  {
    name: 'Mochilas',
    image: '/assets/Home/ellipse_2.png',
  },
  {
    name: 'Cartucheras',
    image: '/assets/Home/ellipse_3.png',
  },
  {
    name: 'Loncheras',
    image: '/assets/Home/ellipse_4.png',
  },
]

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
}

function Features() {
  return (
    <section id="colecciones" className={styles.section} style={{ overflow: 'hidden' }}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={textVariants} className={styles.heading}>COLECCIONES DESTACADAS</motion.h2>
        <motion.p variants={textVariants} className={styles.subheading}>
          Descubre nuestra línea de productos destacados de la semana
        </motion.p>

        <motion.div variants={containerVariants} className={styles.grid}>
          {collections.map((item) => (
            <motion.a
              variants={itemVariants}
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              className={styles.item}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={styles.circle}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className={styles.productImg} />
                ) : (
                  <span className={styles.placeholder}>{item.name.charAt(0)}</span>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={textVariants}>
          <Link
            to="/productos?categoria=bolsos"
            className={styles.cta}
          >
            VER MÁS
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Features
