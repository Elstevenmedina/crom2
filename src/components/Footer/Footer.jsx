import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        {/* Logo */}
        <div className={styles.logoCol}>
          <img
            src="/assets/footer/logo_blanco.png"
            alt="CROM - The perfect choice"
            className={styles.logo}
          />
        </div>

        {/* Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.columnTitle}>ACERCA DE CROM</h4>
          <ul className={styles.linkList}>
            <li><Link to="/nosotros">Sobre Crom</Link></li>
            <li><Link to="/contacto">Trabaja con nosotros</Link></li>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className={styles.contactCol}>
          <a href="https://instagram.com/crom_latam" className={styles.contactItem} target="_blank" rel="noopener noreferrer">
            <span>@crom_latam</span>
            <img src="/assets/Home/instagram.png" alt="Instagram" className={styles.contactIcon} />
          </a>
          <a href="tel:+50763365987" className={styles.contactItem}>
            <span>+507 6336-5987</span>
            <img src="/assets/Home/whatsapp.png" alt="WhatsApp" className={styles.contactIcon} />
          </a>
          <a href="mailto:ventas@hamzisa.com" className={styles.contactItem}>
            <span>ventas@hamzisa.com</span>
            <img src="/assets/Home/email.png" alt="Email" className={styles.contactIcon} />
          </a>
          <address className={styles.addressText}>
            Hamzi, S.A. Zona Libre de Colón<br/>
            Calle 16 Paseo Gorgas, Manzana 18A Edif. 42<br/>
            Colón<br/>
            PA.
          </address>
        </div>
      </div>

      {/* Línea separadora */}
      <div className={styles.divider} />

      {/* Copyright */}
      <p className={styles.copyright}>
        {new Date().getFullYear()} Crom Panam&aacute;. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
