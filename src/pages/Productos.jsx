import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import styles from './Productos.module.css'

const categories = [
    { key: 'bolsos', label: 'BOLSOS', title: 'BOLSOS' },
    { key: 'cartucheras', label: 'CARTUCHERAS', title: 'CARTUCHERAS' },
    { key: 'mochilas', label: 'MOCHILAS', title: 'MOCHILAS' },
    { key: 'loncheras', label: 'LONCHERAS', title: 'LONCHERAS' },
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

function Productos() {
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('categoria') || 'bolsos'

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

            if (!supabase) {
                setProducts([])
                setTotalCount(0)
                setLoading(false)
                return
            }

            // Build count query
            let countQuery = supabase
                .from('products')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true)
                .eq('category', activeCategory)

            const { count } = await countQuery
            setTotalCount(count || 0)

            // Build data query
            let dataQuery = supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .eq('category', activeCategory)

            const { data, error } = await dataQuery
                .order('created_at', { ascending: false })
                .range(0, ITEMS_PER_PAGE - 1)

            if (error) {
                console.error('Error fetching products:', error)
                setProducts([])
            } else {
                setProducts(data || [])
            }
            setLoading(false)
        }

        fetchProducts()
    }, [activeCategory])

    // Paginación
    const loadMore = async () => {
        if (!supabase) return

        const nextPage = currentPage + 1
        const from = (nextPage - 1) * ITEMS_PER_PAGE
        const to = from + ITEMS_PER_PAGE - 1

        let query = supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .eq('category', activeCategory)

        const { data, error } = await query
            .order('created_at', { ascending: false })
            .range(from, to)

        if (!error && data) {
            setProducts((prev) => [...prev, ...data])
            setCurrentPage(nextPage)
        }
    }

    const currentCat = categories.find((c) => c.key === activeCategory) || categories[0]
    const hasMore = products.length < totalCount

    return (
        <div className={styles.pageContainer}>
            <SEO
                title={`${currentCat?.title || 'Productos'} - Cat\u00e1logo`}
                description={`Explora nuestra colecci\u00f3n de ${(currentCat?.title || 'productos').toLowerCase()} CROM. Dise\u00f1os resistentes, funcionales y con estilo para estudiantes y familias.`}
                path={`/productos?categoria=${activeCategory}`}
            />
            {/* Header and Controls */}
            <div className={styles.topSection}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.pageTitle}>{currentCat?.title || 'PRODUCTOS'}</h1>
                </div>
            </div>

            <div className={styles.content}>
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
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className={styles.productCard}
                                    onClick={() => setSelectedProduct(product)}
                                    layoutId={`product-${product.id}`}
                                >
                                    <motion.img
                                        src={product.image_url || '/assets/Home/cartuchera.png'}
                                        alt={product.name || 'Producto'}
                                        className={styles.productImage}
                                        layoutId={`image-${product.id}`}
                                    />
                                    {product.name && (
                                        <div className={styles.productInfo}>
                                            <p className={styles.productName}>{product.name}</p>
                                            {product.code && (
                                                <p className={styles.productCode}>{product.code}</p>
                                            )}
                                            {product.colors && product.colors.length > 0 && (
                                                <div className={styles.productColors}>
                                                    {product.colors.map((c) => {
                                                        const colorData = AVAILABLE_COLORS.find((ac) => ac.value === c)
                                                        return colorData ? (
                                                            <span
                                                                key={c}
                                                                className={styles.productColorDot}
                                                                style={{ background: colorData.hex }}
                                                                title={colorData.label}
                                                            ></span>
                                                        ) : null
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

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
                                    <p className={styles.modalCode}>COD: {selectedProduct.code}</p>
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
