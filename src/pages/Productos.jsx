import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import styles from './Productos.module.css'

// Categorías fallback (se usan si Supabase no está configurado)
const fallbackCategories = [
    { key: 'bolsos', label: 'BOLSOS', title: 'BOLSOS DE VIAJE' },
    { key: 'cartucheras', label: 'CARTUCHERAS', title: 'CARTUCHERAS' },
    { key: 'mochilas', label: 'MOCHILAS', title: 'MOCHILAS' },
    { key: 'loncheras', label: 'LONCHERAS', title: 'LONCHERAS' },
]

const ITEMS_PER_PAGE = 12

function Productos() {
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('categoria') || 'bolsos'

    const [categories, setCategories] = useState(fallbackCategories)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    // Fetch categorías activas desde Supabase
    useEffect(() => {
        const fetchCategories = async () => {
            if (!supabase) return

            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('is_active', true)
                .order('name')

            if (!error && data && data.length > 0) {
                const mapped = data.map((cat) => ({
                    id: cat.id,
                    key: cat.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
                    label: cat.name.toUpperCase(),
                    title: cat.name.toUpperCase(),
                    image_url: cat.image_url,
                }))
                setCategories(mapped)
            }
        }

        fetchCategories()
    }, [])

    // Fetch productos según categoría activa
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setCurrentPage(1)

            if (!supabase) {
                // Sin Supabase, mostrar placeholders
                setProducts([])
                setTotalCount(0)
                setLoading(false)
                return
            }

            const currentCat = categories.find((c) => c.key === activeCategory) || categories[0]

            if (!currentCat?.id) {
                // Si las categorías son fallback (sin id de Supabase)
                setProducts([])
                setTotalCount(0)
                setLoading(false)
                return
            }

            const { count } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true)
                .eq('category_id', currentCat.id)

            setTotalCount(count || 0)

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .eq('category_id', currentCat.id)
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
    }, [activeCategory, categories])

    // Paginación
    const loadMore = async () => {
        if (!supabase) return

        const currentCat = categories.find((c) => c.key === activeCategory) || categories[0]
        if (!currentCat?.id) return

        const nextPage = currentPage + 1
        const from = (nextPage - 1) * ITEMS_PER_PAGE
        const to = from + ITEMS_PER_PAGE - 1

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .eq('category_id', currentCat.id)
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
            {/* Header and Controls */}
            <div className={styles.topSection}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.pageTitle}>{currentCat?.title || 'PRODUCTOS'}</h1>
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
                    {loading ? (
                        <div className={styles.loadingState}>Cargando productos...</div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyState}>
                            No hay productos disponibles en esta categoría.
                        </div>
                    ) : (
                        <>
                            {products.map((product) => (
                                <div key={product.id} className={styles.productCard}>
                                    <img
                                        src={product.image_url || '/assets/Home/cartuchera.png'}
                                        alt={product.name || 'Producto'}
                                        className={styles.productImage}
                                    />
                                    {product.name && (
                                        <div className={styles.productInfo}>
                                            <p className={styles.productName}>{product.name}</p>
                                            {product.code && (
                                                <p className={styles.productCode}>{product.code}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
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
        </div>
    )
}

export default Productos
