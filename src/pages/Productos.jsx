import { useSearchParams } from 'react-router-dom'
import styles from './Productos.module.css'

const categories = [
    { key: 'bolsos', label: 'BOLSOS', title: 'BOLSOS DE VIAJE' },
    { key: 'cartucheras', label: 'CARTUCHERAS', title: 'CARTUCHERAS' },
    { key: 'mochilas', label: 'MOCHILAS', title: 'MOCHILAS' },
    { key: 'loncheras', label: 'LONCHERAS', title: 'LONCHERAS' },
]

/* Placeholder products per category */
const productsByCategory = {
    bolsos: [
        { id: 1, image: '/assets/Home/cartuchera.png', alt: 'Bolso Azul Estampado' },
        { id: 2, image: '/assets/Home/cartuchera.png', alt: 'Bolso Rosa' },
        { id: 3, image: '/assets/Home/cartuchera.png', alt: 'Bolso Cyan' },
        { id: 4, image: '/assets/Home/cartuchera.png', alt: 'Bolso Gris Logo' },
        { id: 5, image: '/assets/Home/cartuchera.png', alt: 'Bolso Verde' },
        { id: 6, image: '/assets/Home/cartuchera.png', alt: 'Bolso Gris' },
        { id: 7, image: '/assets/Home/cartuchera.png', alt: 'Bolso Extra' },
        { id: 8, image: '/assets/Home/cartuchera.png', alt: 'Bolso Extra 2' },
        { id: 9, image: '/assets/Home/cartuchera.png', alt: 'Bolso Extra 3' },
    ],
    cartucheras: [
        { id: 1, image: '/assets/Home/cartuchera.png', alt: 'Cartuchera Azul' },
        { id: 2, image: '/assets/Home/cartuchera.png', alt: 'Cartuchera Rosa' },
        { id: 3, image: '/assets/Home/cartuchera.png', alt: 'Cartuchera Verde' },
        { id: 4, image: '/assets/Home/cartuchera.png', alt: 'Cartuchera Roja' },
        { id: 5, image: '/assets/Home/cartuchera.png', alt: 'Cartuchera Negra' },
        { id: 6, image: '/assets/Home/cartuchera.png', alt: 'Cartuchera Gris' },
    ],
    mochilas: [
        { id: 1, image: '/assets/Home/cartuchera.png', alt: 'Mochila Azul' },
        { id: 2, image: '/assets/Home/cartuchera.png', alt: 'Mochila Roja' },
        { id: 3, image: '/assets/Home/cartuchera.png', alt: 'Mochila Negra' },
        { id: 4, image: '/assets/Home/cartuchera.png', alt: 'Mochila Verde' },
        { id: 5, image: '/assets/Home/cartuchera.png', alt: 'Mochila Rosa' },
        { id: 6, image: '/assets/Home/cartuchera.png', alt: 'Mochila Gris' },
    ],
    loncheras: [
        { id: 1, image: '/assets/Home/cartuchera.png', alt: 'Lonchera Azul' },
        { id: 2, image: '/assets/Home/cartuchera.png', alt: 'Lonchera Rosa' },
        { id: 3, image: '/assets/Home/cartuchera.png', alt: 'Lonchera Roja' },
        { id: 4, image: '/assets/Home/cartuchera.png', alt: 'Lonchera Verde' },
        { id: 5, image: '/assets/Home/cartuchera.png', alt: 'Lonchera Negra' },
        { id: 6, image: '/assets/Home/cartuchera.png', alt: 'Lonchera Gris' },
    ],
}

function Productos() {
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('categoria') || 'bolsos'

    const currentCat = categories.find((c) => c.key === activeCategory) || categories[0]
    const products = productsByCategory[activeCategory] || productsByCategory.bolsos

    return (
        <div className={styles.pageContainer}>
            {/* Header and Controls */}
            <div className={styles.topSection}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.pageTitle}>{currentCat.title}</h1>
                </div>

                <div className={styles.controls}>
                    <button className={styles.filterBtn}>
                        OCULTAR FILTROS
                        <span style={{ fontSize: '1.2rem' }}>&#9881;</span>
                    </button>

                    <select className={styles.sortSelect} defaultValue="relevancia">
                        <option value="relevancia">ORDENAR POR: RELEVANCIA</option>
                        <option value="precio_asc">PRECIO: MENOR A MAYOR</option>
                        <option value="precio_desc">PRECIO: MAYOR A MENOR</option>
                    </select>
                </div>
            </div>

            <div className={styles.content}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>COLOR</h3>
                        <div className={styles.colorList}>
                            <div className={styles.colorItem}>
                                <span className={styles.colorCircle} style={{ background: '#4ade80' }}></span>
                                verde
                            </div>
                            <div className={styles.colorItem}>
                                <span className={styles.colorCircle} style={{ background: '#fb923c' }}></span>
                                naranja
                            </div>
                            <div className={styles.colorItem}>
                                <span className={styles.colorCircle} style={{ background: '#1e3a8a' }}></span>
                                azul oscuro
                            </div>
                            <div className={styles.colorItem}>
                                <span className={styles.colorCircle} style={{ background: '#ef4444' }}></span>
                                rojo
                            </div>
                            <div className={styles.colorItem}>
                                <span className={styles.colorCircle} style={{ background: '#3b82f6' }}></span>
                                azul
                            </div>
                            <div className={styles.colorItem}>
                                <span className={styles.colorCircle} style={{ background: '#000000' }}></span>
                                negro
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className={styles.productGrid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <img src={product.image} alt={product.alt} className={styles.productImage} />
                        </div>
                    ))}
                </main>
            </div>
        </div>
    )
}

export default Productos
