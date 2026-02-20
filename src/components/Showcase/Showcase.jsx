import styles from './Showcase.module.css'

function Showcase() {
  return (
    <section className={styles.section}>
      {/* Lado izquierdo — Branding */}
      <div className={styles.left}>
        <img
          src="/assets/Home/crom_text.png"
          alt="CROM - The perfect choice"
          className={styles.brandImg}
        />
      </div>

      {/* Lado derecho — Imagen producto sobre fondo rojo */}
      <div className={styles.right}>
        <div className={styles.redBg} />
        <div className={styles.productWrapper}>
          <img
            src="/assets/Home/cartuchera.png"
            alt="Cartuchera CROM"
            className={styles.productImg}
          />
        </div>
      </div>
    </section>
  )
}

export default Showcase
