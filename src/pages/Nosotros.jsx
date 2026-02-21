import { motion } from 'framer-motion'
import styles from './Nosotros.module.css'

// Variantes de animación personalizadas para dar variedad y no usar la misma siempre
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

function Nosotros() {
  return (
    <main>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className={styles.title}>Sobre Nosotros</h1>
          <p className={styles.description}>
            Crom es una marca con más de 30 años de trayectoria en el mercado, construida sobre la experiencia, la constancia y el compromiso con la calidad.
          </p>
        </motion.div>
      </motion.section>

      {/* Section: Propósito */}
      <motion.section
        className={styles.purpose}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className={styles.purposeContainer}>
          <h2 className={styles.purposeTitle}>
            Desde sus inicios, nació con un propósito claro:
          </h2>
          <p className={styles.purposeText}>
            desarrollar mochilas resistentes y funcionales que acompañen a las personas
            en su rutina diaria, especialmente en el entorno escolar y urbano.
          </p>
        </div>
      </motion.section>

      <div className={styles.combinedBg}>
        {/* Section: Expansión (Fondo Rojo + Imagen Niño + Tarjeta) */}
        <section className={styles.expansion}>
          <div className={styles.expansionContent}>

            {/* Imagen del niño (Lado Izquierdo) */}
            <motion.div
              className={styles.kidImageWrapper}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <img
                src="/assets/Nosotros/backpad_kid.png"
                alt="Niño con mochila Crom"
                className={styles.kidImage}
              />
            </motion.div>

            {/* Tarjeta de texto (Lado Derecho) */}
            <motion.div
              className={styles.expansionCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <p>
                Con el paso del tiempo, Crom amplió su portafolio para ofrecer una propuesta integral
                que incluye mochilas, loncheras y bolsos escolares, diseñados para responder a las
                necesidades reales de estudiantes, familias y usuarios activos.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Section: Franja Productos */}
        <motion.section
          className={styles.productStrip}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.productStripContent}>
            <div className={styles.productTextSide}>
              <h2 className={styles.productTitle}>
                Cada producto refleja un<br />equilibrio entre diseño
              </h2>
              <p className={styles.productSubtitle}>
                practicidad y durabilidad, valores que han definido a<br />
                la marca durante más de tres décadas.
              </p>
            </div>

            <div className={styles.productButtonSide}>
              <motion.a
                href="/productos"
                className={styles.productButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver productos
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Section: Diferenciadores */}
      <section className={styles.differentiators}>
        <motion.div
          className={styles.diffContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className={styles.diffTitle}>Uno de los principales diferenciadores de Crom</motion.h2>
          <motion.p variants={fadeInUp} className={styles.diffSubtitle}>
            Es que <strong>selecciona y desarrolla</strong> sus propios modelos, trabajando
            directamente con sus fábricas.
          </motion.p>

          <div className={styles.diffCards}>
            {/* Card 1 */}
            <motion.div variants={staggerItem} className={`${styles.diffCard} ${styles.diffCardLight}`}>
              <div className={styles.diffIconWrapper}>
                <img src="/assets/Nosotros/flecha.png" alt="Estándar alto" className={styles.diffIcon} />
              </div>
              <h3 className={styles.diffCardTitle}>Estándar alto</h3>
              <p className={styles.diffCardText}>Garantía de excelencia en cada colección.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={staggerItem} className={`${styles.diffCard} ${styles.diffCardMid}`}>
              <div className={styles.diffIconWrapper}>
                <img src="/assets/Nosotros/palanca-de-control copia.png" alt="Control directo" className={styles.diffIcon} />
              </div>
              <h3 className={styles.diffCardTitle}>Control directo</h3>
              <p className={styles.diffCardText}>Supervisión cercana de materiales, producción y acabados para calidad constante.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={staggerItem} className={`${styles.diffCard} ${styles.diffCardSoft}`}>
              <div className={styles.diffIconWrapper}>
                <img src="/assets/Nosotros/insignia.png" alt="Mejora continua" className={styles.diffIcon} />
              </div>
              <h3 className={styles.diffCardTitle}>Mejora continua</h3>
              <p className={styles.diffCardText}>Adaptación rápida a tendencias y demandas del mercado.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section: Experiencia */}
      <section className={styles.experience}>
        <motion.div
          className={styles.expContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Fila superior: título + textos */}
          <div className={styles.expTop}>
            <motion.div variants={fadeInLeft} className={styles.expTitleBlock}>
              <h2 className={styles.expTitle}>
                <span className={styles.expTitleRed}>Gracias a su experiencia</span><br />
                y estructura operativa
              </h2>
            </motion.div>
            <motion.div variants={fadeInRight} className={styles.expTextBlock}>
              <p className={styles.expText}>
                Crom cuenta hoy con un alcance internacional, con presencia en los mismos países donde opera Bebesitos, lo que le permite atender distintos mercados de la región con eficiencia y consistencia.
              </p>
            </motion.div>
            <motion.div variants={fadeInRight} className={styles.expTextBlock}>
              <p className={styles.expText}>
                Esta expansión refleja la solidez de la marca y su capacidad para responder a las exigencias de distribución, volumen y calidad en múltiples países.
              </p>
            </motion.div>
          </div>

          {/* Fila inferior: imágenes */}
          <div className={styles.expImages}>
            <motion.div
              variants={staggerItem}
              className={styles.expImgWrapper}
            >
              <img
                src="/assets/Nosotros/small-business-manager-his-workshop.png"
                alt="Artesano trabajando"
                className={styles.expImgFirst}
              />
            </motion.div>
            <motion.div
              variants={staggerItem}
              className={styles.expImgWrapper}
            >
              <img
                src="/assets/Nosotros/woman-tailor-working-leather-fabric.png"
                alt="Mujer diseñando"
                className={styles.expImgSecond}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section: En la actualidad */}
      <motion.section
        className={styles.actuality}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className={styles.actualityContainer}>
          <motion.span whileHover={{ scale: 1.05 }} className={styles.actualityBadge}>En la actualidad</motion.span>

          <h2 className={styles.actualityTitle}>
            Crom se posiciona como una <span className={styles.actualityRed}>marca confiable</span>
          </h2>

          <p className={styles.actualityDesc}>
            Experimentada y con visión regional, elegida por clientes y aliados comerciales<br />
            que buscan mochilas, loncheras y bolsos escolares bien<br />
            diseñados, duraderos y respaldados por una trayectoria comprobada.
          </p>

          <h3 className={styles.actualityClosing}>
            Su compromiso sigue siendo <span className={styles.actualityRed}>el mismo desde hace más de 30 años</span>
          </h3>
          <p className={styles.actualitySubtext}>
            crear productos que acompañen, resistan y evolucionen
          </p>
        </div>
      </motion.section>
    </main>
  )
}

export default Nosotros
