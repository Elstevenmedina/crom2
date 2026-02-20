import styles from './CategoryBanner.module.css'

function CategoryBanner() {
  return (
    <section className={styles.section}>
      {/* Lado izquierdo — Imagen del producto */}
      <div className={styles.left}>
        <img
          src="/assets/Home/image_lonchera.png"
          alt="Lonchera CROM"
          className={styles.productImg}
        />
      </div>

      {/* Lado derecho — Título y descripción */}
      <div className={styles.right}>
        <div className={styles.content}>
          <h2 className={styles.title}>LONCHERAS</h2>
          <p className={styles.description}>
            Diseñados para responder a las necesidades
            reales de estudiantes, familias y usuarios activos.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CategoryBanner
