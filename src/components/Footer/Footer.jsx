import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer id="contacto" className={styles.footer}>
      {/* Columnas principales */}
      <div className={styles.columns}>
        {/* AYUDA */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>AYUDA</h4>
          <ul className={styles.linkList}>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
          </ul>
        </div>

{/* ACERCA DE CROM */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>ACERCA DE CROM</h4>
          <ul className={styles.linkList}>
            <li><Link to="/nosotros">Sobre Crom</Link></li>
            <li><Link to="/contacto">Trabaja con nosotros</Link></li>
          </ul>
        </div>
      </div>

      {/* Línea separadora */}
      <div className={styles.divider} />

      {/* Barra inferior */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          {new Date().getFullYear()} Crom Panamá. All Rights Reserved.
        </p>

        <div className={styles.contactInfo}>
          {/* Instagram */}
          <a href="https://instagram.com/crom_latam" className={styles.contactItem} target="_blank" rel="noopener noreferrer">
            <img src="/assets/Home/instagram.png" alt="Instagram" className={styles.contactIcon} />
            <span>@crom_latam</span>
          </a>

          {/* Teléfono */}
          <a href="tel:+50763365987" className={styles.contactItem}>
            <img src="/assets/Home/whatsapp.png" alt="WhatsApp" className={styles.contactIcon} />
            <span>+507 6336-5987</span>
          </a>

          {/* Email */}
          <a href="mailto:ventas@hamzisa.com" className={styles.contactItem}>
            <img src="/assets/Home/email.png" alt="Email" className={styles.contactIcon} />
            <span>ventas@hamzisa.com</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
