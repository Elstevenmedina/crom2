import styles from './Contacto.module.css'

function Contacto() {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Contáctanos</h1>
                    <p className={styles.subtitle}>
                        ¿Necesitas información sobre morrales, distribución o alianzas comerciales?<br />
                        Escríbenos y te respondemos en 24 horas.
                    </p>
                </div>
            </section>

            {/* Opciones de Contacto */}
            <section className={styles.contactOptions}>
                <div className={styles.optionsContainer}>
                    {/* WhatsApp */}
                    <div className={styles.contactCard}>
                        <div className={styles.iconWrapper}>
                            <img
                                src="/assets/contactanos/llamar (2).png"
                                alt="WhatsApp"
                                className={styles.contactIcon}
                            />
                        </div>
                        <h2 className={styles.contactTitle}>Escríbenos al Whatsapp</h2>
                        <p className={styles.contactText}>
                            Habla directamente con nuestro equipo comercial especializado. Te asesoramos sobre distribución, stock disponible y precios mayoristas al instante.
                        </p>
                        <a href="tel:+50763365987" className={styles.contactLink}>+507 6336-5987</a>
                    </div>

                    {/* Email */}
                    <div className={styles.contactCard}>
                        <div className={styles.iconWrapper}>
                            <img
                                src="/assets/contactanos/correo-electronico.png"
                                alt="Email"
                                className={styles.contactIcon}
                            />
                        </div>
                        <h2 className={styles.contactTitle}>Escríbenos al Email</h2>
                        <p className={styles.contactText}>
                            Envíanos tu consulta sobre distribuidores internacionales, nuevos modelos de mochilas escolares o disponibilidad de loncheras.
                        </p>
                        <a href="mailto:ventas@hamzisa.com" className={styles.contactLink}>ventas@hamzisa.com</a>
                    </div>
                </div>
            </section>

            {/* Formulario Distribuidores */}
            <section className={styles.formSection}>
                <div className={styles.formCard}>
                    <div className={styles.formBody}>
                        <h2 className={styles.formTitle}>
                            Forma parte de nuestros<br />
                            distribuidores internacionales
                        </h2>

                        <form className={styles.formGrid}>
                            <input type="text" placeholder="Nombre y Apellido*" className={styles.inputField} />
                            <input type="text" placeholder="Nombre de la empresa*" className={styles.inputField} />

                            <input type="email" placeholder="Correo*" className={styles.inputField} />
                            <select className={`${styles.inputField} ${styles.selectField}`}>
                                <option value="">Tipo de empresa*</option>
                                <option value="retail">Retail</option>
                                <option value="wholesale">Mayorista</option>
                                <option value="other">Otro</option>
                            </select>

                            <input type="tel" placeholder="Teléfono*" className={styles.inputField} />
                            <input type="text" placeholder="País*" className={styles.inputField} />

                            <input type="text" placeholder="Sitio Web*" className={styles.inputField} />
                            <input type="text" placeholder="Mensaje*" className={styles.inputField} />
                        </form>
                    </div>

                    <div className={styles.formFooter}>
                        <p className={styles.footerText}>
                            Te respondemos en máximo 24 horas<br />
                            con toda la información.
                        </p>
                        <button type="button" className={styles.submitBtn}>
                            Enviar
                        </button>
                    </div>
                </div>
            </section>

            {/* Placeholder for actual contact content/form later */}
        </div>
    )
}

export default Contacto
