import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import styles from './Productos.module.css'

const categories = [
    { key: 'cartucheras', label: 'Cartucheras' },
    { key: 'mochilas', label: 'Mochilas' },
    { key: 'loncheras', label: 'Loncheras' },
    { key: 'bolsos', label: 'Mochilas escolares' },
    { key: 'bolsos_viaje', label: 'Bolsos de viaje' },
    { key: 'maletas', label: 'Maletas de viaje' },
]

const AVAILABLE_COLORS = [
    { value: 'verde', label: 'verde', hex: '#4ade80' },
    { value: 'naranja', label: 'naranja', hex: '#fb923c' },
    { value: 'azul_oscuro', label: 'azul oscuro', hex: '#1e3a8a' },
    { value: 'rojo', label: 'rojo', hex: '#ef4444' },
    { value: 'azul', label: 'azul', hex: '#3b82f6' },
    { value: 'negro', label: 'negro', hex: '#000000' },
]

const ITEMS_PER_PAGE = 16

// Arma la query del catalogo publico: el backend ya filtra por activos
const buildQuery = ({ limit, offset, category }) => {
    const params = new URLSearchParams({ limit, offset })
    if (category) params.set('category', category)
    return `/products?${params.toString()}`
}

function Productos() {
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('categoria') || 'cartucheras'

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState(null)

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [selectedProduct])

    // Fetch productos según categoría activa
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setCurrentPage(1)

            try {
                // El backend devuelve total e items en una sola llamada
                const { total, items } = await api.get(
                    buildQuery({ limit: ITEMS_PER_PAGE, offset: 0, category: activeCategory })
                )
                setTotalCount(total)
                setProducts(items)
            } catch (error) {
                console.error('Error fetching products:', error)
                setProducts([])
                setTotalCount(0)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [activeCategory])

    // Paginación
    const loadMore = async () => {
        const nextPage = currentPage + 1
        const offset = (nextPage - 1) * ITEMS_PER_PAGE

        try {
            const { items } = await api.get(
                buildQuery({ limit: ITEMS_PER_PAGE, offset, category: activeCategory })
            )
            setProducts((prev) => [...prev, ...items])
            setCurrentPage(nextPage)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const currentCat = categories.find((c) => c.key === activeCategory)
    const hasMore = products.length < totalCount

    return (
        <div className={styles.pageContainer}>
            <SEO
                title={`${currentCat?.label || 'Productos'} - Cat\u00e1logo`}
                description={`Explora nuestra colecci\u00f3n de ${(currentCat?.label || 'productos').toLowerCase()} CROM. Dise\u00f1os resistentes, funcionales y con estilo para estudiantes y familias.`}
                path={`/productos${activeCategory ? `?categoria=${activeCategory}` : ''}`}
            />

            <p className={styles.pageSubtitle}>
                A continuación encontrarás una pequeña fracción de lo que ofrecemos, contáctanos por más
            </p>

            <div className={styles.content}>
                {/* Sidebar de categorías */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h1 className={styles.sidebarTitle}>PRODUCTOS</h1>
                        <div className={styles.sidebarDivider}></div>
                    </div>
                    <nav className={styles.categoryNav}>
                        {categories.map((cat) => (
                            <Link
                                key={cat.key}
                                to={`/productos?categoria=${cat.key}`}
                                className={`${styles.categoryItem} ${activeCategory === cat.key ? styles.categoryItemActive : ''}`}
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Product Grid */}
                <main className={styles.productGrid}>
                    {loading ? (
                        <div className={styles.loadingState}>Cargando productos...</div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyState}>
                            No hay productos disponibles en esta categoría.
                        </div>
                    ) : (
                        <>
                            {products.map((product) => {
                                const catLabel = categories.find((c) => c.key === product.category)?.label || product.category
                                return (
                                    <motion.div
                                        key={product.id}
                                        className={styles.productCard}
                                        onClick={() => setSelectedProduct(product)}
                                        layoutId={`product-${product.id}`}
                                    >
                                        <div className={styles.productImageWrap}>
                                            <motion.img
                                                src={product.imageUrl || '/assets/Home/cartuchera.png'}
                                                alt={product.name || 'Producto'}
                                                className={styles.productImage}
                                                layoutId={`image-${product.id}`}
                                            />
                                        </div>
                                        <div className={styles.productInfo}>
                                            <div className={styles.productDivider}></div>
                                            {product.name && <p className={styles.productCategory}>{product.name}</p>}
                                            {product.code && <p className={styles.productCode}><strong>{product.code}</strong></p>}
                                            {product.features && product.features.length > 0 && (
                                                <ul className={styles.productFeatures}>
                                                    {product.features.map((feat, i) => (
                                                        <li key={i} className={styles.productFeatureItem}>{feat}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {hasMore && (
                                <div className={styles.loadMoreWrapper}>
                                    <button onClick={loadMore} className={styles.loadMoreBtn}>
                                        Cargar más productos
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Modal de Producto */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button className={styles.modalClose} onClick={() => setSelectedProduct(null)}>✕</button>
                            <motion.img
                                src={selectedProduct.image_url || '/assets/Home/cartuchera.png'}
                                alt={selectedProduct.name}
                                className={styles.modalImage}
                                layoutId={`image-${selectedProduct.id}`}
                            />
                            <div className={styles.modalInfo}>
                                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
                                {selectedProduct.code && (
                                    <p className={styles.modalCode}>{selectedProduct.code}</p>
                                )}
                                {selectedProduct.features && selectedProduct.features.length > 0 && (
                                    <ul className={styles.modalFeatures}>
                                        {selectedProduct.features.map((feat, i) => (
                                            <li key={i}>{feat}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Productos
