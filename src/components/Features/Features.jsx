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

function Features() {
  return (
    <section id="colecciones" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>COLECCIONES DESTACADAS</h2>
        <p className={styles.subheading}>
          Descubre nuestra línea de productos destacados de la semana
        </p>

        <div className={styles.grid}>
          {collections.map((item) => (
            <a key={item.name} href={`#${item.name.toLowerCase()}`} className={styles.item}>
              <div className={styles.circle}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className={styles.productImg} />
                ) : (
                  <span className={styles.placeholder}>{item.name.charAt(0)}</span>
                )}
              </div>
            </a>
          ))}
        </div>

        <a href="#colecciones" className={styles.cta}>
          VER MÁS
        </a>
      </div>
    </section>
  )
}

export default Features
