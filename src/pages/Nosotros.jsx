import styles from './Nosotros.module.css'

function Nosotros() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Sobre Nosotros</h1>
          <p className={styles.description}>
            Crom es una marca con más de 30 años de trayectoria en el mercado, construida sobre la experiencia, la constancia y el compromiso con la calidad.
          </p>
        </div>
      </section>

      {/* Section: Propósito */}
      <section className={styles.purpose}>
        <div className={styles.purposeContainer}>
          <h2 className={styles.purposeTitle}>
            Desde sus inicios, nació con un propósito claro:
          </h2>
          <p className={styles.purposeText}>
            desarrollar mochilas resistentes y funcionales que acompañen a las personas
            en su rutina diaria, especialmente en el entorno escolar y urbano.
          </p>
        </div>
      </section>

      {/* Section: Expansión (Fondo Rojo + Imagen Niño + Tarjeta) */}
      <section className={styles.expansion}>
        <div className={styles.expansionContent}>

          {/* Imagen del niño (Lado Izquierdo) */}
          <div className={styles.kidImageWrapper}>
            <img
              src="/assets/Nosotros/backpad_kid.png"
              alt="Niño con mochila Crom"
              className={styles.kidImage}
            />
          </div>

          {/* Tarjeta de texto (Lado Derecho) */}
          <div className={styles.expansionCard}>
            <p>
              Con el paso del tiempo, Crom amplió su portafolio para ofrecer una propuesta integral
              que incluye mochilas, loncheras y bolsos escolares, diseñados para responder a las
              necesidades reales de estudiantes, familias y usuarios activos.
            </p>
          </div>

        </div>
      </section>

      {/* Section: Franja Productos */}
      <section className={styles.productStrip}>
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
            <a href="/productos" className={styles.productButton}>
              Ver productos
            </a>
          </div>
        </div>
      </section>

      {/* Section: Diferenciadores */}
      <section className={styles.differentiators}>
        <div className={styles.diffContainer}>
          <h2 className={styles.diffTitle}>Uno de los principales diferenciadores de Crom</h2>
          <p className={styles.diffSubtitle}>
            Es que <strong>selecciona y desarrolla</strong> sus propios modelos, trabajando
            directamente con sus fábricas.
          </p>

          <div className={styles.diffCards}>
            {/* Card 1 */}
            <div className={`${styles.diffCard} ${styles.diffCardLight}`}>
              <div className={styles.diffIconWrapper}>
                <img src="/assets/Nosotros/flecha.png" alt="Estándar alto" className={styles.diffIcon} />
              </div>
              <h3 className={styles.diffCardTitle}>Estándar alto</h3>
              <p className={styles.diffCardText}>Garantía de excelencia en cada colección.</p>
            </div>

            {/* Card 2 */}
            <div className={`${styles.diffCard} ${styles.diffCardMid}`}>
              <div className={styles.diffIconWrapper}>
                <img src="/assets/Nosotros/palanca-de-control copia.png" alt="Control directo" className={styles.diffIcon} />
              </div>
              <h3 className={styles.diffCardTitle}>Control directo</h3>
              <p className={styles.diffCardText}>Supervisión cercana de materiales, producción y acabados para calidad constante.</p>
            </div>

            {/* Card 3 */}
            <div className={`${styles.diffCard} ${styles.diffCardSoft}`}>
              <div className={styles.diffIconWrapper}>
                <img src="/assets/Nosotros/insignia.png" alt="Mejora continua" className={styles.diffIcon} />
              </div>
              <h3 className={styles.diffCardTitle}>Mejora continua</h3>
              <p className={styles.diffCardText}>Adaptación rápida a tendencias y demandas del mercado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Experiencia */}
      <section className={styles.experience}>
        <div className={styles.expContainer}>
          {/* Fila superior: título + textos */}
          <div className={styles.expTop}>
            <div className={styles.expTitleBlock}>
              <h2 className={styles.expTitle}>
                <span className={styles.expTitleRed}>Gracias a su experiencia</span><br />
                y estructura operativa
              </h2>
            </div>
            <div className={styles.expTextBlock}>
              <p className={styles.expText}>
                Crom cuenta hoy con un alcance internacional, con presencia en los mismos países donde opera Bebesitos, lo que le permite atender distintos mercados de la región con eficiencia y consistencia.
              </p>
            </div>
            <div className={styles.expTextBlock}>
              <p className={styles.expText}>
                Esta expansión refleja la solidez de la marca y su capacidad para responder a las exigencias de distribución, volumen y calidad en múltiples países.
              </p>
            </div>
          </div>

          {/* Fila inferior: imágenes */}
          <div className={styles.expImages}>
            <div className={styles.expImgWrapper}>
              <img
                src="/assets/Nosotros/small-business-manager-his-workshop.png"
                alt="Artesano trabajando"
                className={styles.expImgFirst}
              />
            </div>
            <div className={styles.expImgWrapper}>
              <img
                src="/assets/Nosotros/woman-tailor-working-leather-fabric.png"
                alt="Mujer diseñando"
                className={styles.expImgSecond}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: En la actualidad */}
      <section className={styles.actuality}>
        <div className={styles.actualityContainer}>
          <span className={styles.actualityBadge}>En la actualidad</span>

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
      </section>
    </>
  )
}

export default Nosotros
