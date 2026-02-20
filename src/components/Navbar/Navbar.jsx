import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const slides = [
  {
    id: 1,
    image: '/assets/Home/hero_image.png',
  },
  {
    id: 2,
    title: 'Bolso CROM Urban',
    subtitle: 'Diseño urbano con máxima capacidad',
    category: 'BOLSOS',
  },
  {
    id: 3,
    title: 'Lonchera CROM Kids',
    subtitle: 'Práctica, térmica y divertida',
    category: 'LONCHERAS',
  },
]

const navLinks = [
  { label: 'BOLSOS', to: '/productos?categoria=bolsos' },
  { label: 'CARTUCHERAS', to: '/productos?categoria=cartucheras' },
  { label: 'MOCHILAS', to: '/productos?categoria=mochilas' },
  { label: 'LONCHERAS', to: '/productos?categoria=loncheras' },
  { label: 'NOSOTROS', to: '/nosotros' },
  { label: 'CONTACTO', to: '/contacto' },
]

function Navbar() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  /* ---- Header para páginas internas (Nosotros, etc.) ---- */
  if (!isHome) {
    const isTransparentPage = ['/nosotros'].includes(location.pathname)
    const isWhitePage = ['/faq', '/productos'].includes(location.pathname)

    // Determine nav class
    let navClass = styles.navSimple
    if (isTransparentPage) navClass = styles.navTransparent
    if (isWhitePage) navClass = styles.navWhite

    return (
      <header className={`${styles.header} ${isTransparentPage ? styles.headerTransparent : ''}`}>
        {/* Franja roja con mensaje */}
        <div className={styles.promoBanner}>
          <span className={styles.promoText}>TU OPINIÓN IMPORTA</span>
          <a href="#detalles" className={styles.promoBtn}>DETALLES</a>
        </div>

        {/* Logo */}
        <nav className={navClass}>
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logoLink}>
              <img src="/assets/Home/logo.png" alt="CROM" className={styles.logo} />
            </Link>
          </div>

          {/* Links de navegación */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => {
              const currentUrl = location.pathname + location.search
              const isActive = link.to.includes('?')
                ? currentUrl === link.to
                : location.pathname === link.to
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={isActive ? styles.activeLink : ''}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Línea roja separadora */}
        {!isTransparentPage && <div className={styles.dividerLine} />}
      </header>
    )
  }

  /* ---- Header para Home (con carrusel) ---- */
  return (
    <header className={styles.header}>
      <div className={styles.carousel}>
        {/* Navbar superpuesto */}
        <div className={styles.navOverlay}>
          <div className={styles.topBar} />
          <nav className={styles.nav}>
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.logoLink}>
                <img src="/assets/Home/logo.png" alt="CROM" className={styles.logo} />
              </Link>
            </div>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Slides */}
        <div className={styles.slidesTrack}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
            >
              <div className={styles.slideContent}>
                {slide.image ? (
                  <img src={slide.image} alt="CROM" className={styles.slideImg} />
                ) : (
                  <>
                    <span className={styles.slideCategory}>{slide.category}</span>
                    <h2 className={styles.slideTitle}>{slide.title}</h2>
                    <p className={styles.slideSubtitle}>{slide.subtitle}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Flecha izquierda */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Flecha derecha */}
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={nextSlide}
          aria-label="Siguiente slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
