import styles from './About.module.css'

function About() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nuestra Historia</h2>

        <p className={styles.intro}>
          Crom es una marca con más de 30 años de trayectoria en el mercado, construida
          sobre la experiencia, la constancia y el compromiso con la calidad. Desde sus inicios,
          nació con un propósito claro: desarrollar mochilas resistentes y funcionales que
          acompañen a las personas en su rutina diaria, especialmente en el entorno
          escolar y urbano.
        </p>

        <div className={styles.features}>
          {/* Autonomía */}
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <img src="/assets/Home/icon_2.png" alt="Autonomía" className={styles.icon} />
            </div>
            <div className={styles.featureText}>
              <h3>Autonomía</h3>
              <p>
                Crom selecciona y desarrolla sus propios modelos,
                trabajando directamente con sus fábricas.
              </p>
            </div>
          </div>

          {/* Expansión */}
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <img src="/assets/Home/icon_1.png" alt="Expansión" className={styles.icon} style={{ marginTop: '1.2rem' }} />
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
          </div>
        </div>

        <a href="#nosotros" className={styles.cta}>
          CONOCE MÁS
        </a>
      </div>
    </section>
  )
}

export default About
