import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
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

const ITEMS_PER_PAGE = 12

function Productos() {
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('categoria') || 'bolsos'

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedColors, setSelectedColors] = useState([])
    const [showFilters, setShowFilters] = useState(true)

    const toggleColor = (colorValue) => {
        setSelectedColors((prev) =>
            prev.includes(colorValue)
                ? prev.filter((c) => c !== colorValue)
                : [...prev, colorValue]
        )
    }

    // Fetch productos según categoría activa y colores seleccionados
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

            if (selectedColors.length > 0) {
                countQuery = countQuery.overlaps('colors', selectedColors)
            }

            const { count } = await countQuery
            setTotalCount(count || 0)

            // Build data query
            let dataQuery = supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .eq('category', activeCategory)

            if (selectedColors.length > 0) {
                dataQuery = dataQuery.overlaps('colors', selectedColors)
            }

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
    }, [activeCategory, selectedColors])

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

        if (selectedColors.length > 0) {
            query = query.overlaps('colors', selectedColors)
        }

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
            {/* Header and Controls */}
            <div className={styles.topSection}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.pageTitle}>{currentCat?.title || 'PRODUCTOS'}</h1>
                </div>

                <div className={styles.controls}>
                    <button
                        className={styles.filterBtn}
                        onClick={() => setShowFilters((prev) => !prev)}
                    >
                        {showFilters ? 'OCULTAR FILTROS' : 'MOSTRAR FILTROS'}
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
                {showFilters && (
                    <aside className={styles.sidebar}>
                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>COLOR</h3>
                            <div className={styles.colorList}>
                                {AVAILABLE_COLORS.map((color) => (
                                    <div
                                        key={color.value}
                                        className={`${styles.colorItem} ${selectedColors.includes(color.value) ? styles.colorItemActive : ''}`}
                                        onClick={() => toggleColor(color.value)}
                                    >
                                        <span
                                            className={`${styles.colorCircle} ${selectedColors.includes(color.value) ? styles.colorCircleActive : ''}`}
                                            style={{ background: color.hex }}
                                        ></span>
                                        {color.label}
                                    </div>
                                ))}
                            </div>

                            {selectedColors.length > 0 && (
                                <button
                                    className={styles.clearFilters}
                                    onClick={() => setSelectedColors([])}
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </aside>
                )}

                {/* Product Grid */}
                <main className={styles.productGrid}>
                    {loading ? (
                        <div className={styles.loadingState}>Cargando productos...</div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyState}>
                            No hay productos disponibles
                            {selectedColors.length > 0 ? ' con los filtros seleccionados.' : ' en esta categoría.'}
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
