import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './ProductList.module.css'

const COLOR_MAP = {
  verde: '#4ade80',
  naranja: '#fb923c',
  azul_oscuro: '#1e3a8a',
  rojo: '#ef4444',
  azul: '#3b82f6',
  negro: '#000000',
}

function ProductList({ onEdit, onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return <div className={styles.loading}>Cargando productos...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.count}>{products.length} producto(s)</p>
        <button onClick={onAdd} className={styles.addBtn}>
          + Nuevo Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay productos registrados.</p>
          <button onClick={onAdd} className={styles.addBtn}>
            Crear primer producto
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.card}
              onClick={() => onEdit(product)}
            >
              <div className={styles.imageWrapper}>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>Sin imagen</div>
                )}
                <span className={`${styles.badge} ${product.is_active ? styles.badgeActive : styles.badgeInactive}`}>
                  {product.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productCode}>{product.code}</p>
                {product.category && (
                  <p className={styles.productCategory}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                )}
                {product.colors && product.colors.length > 0 && (
                  <div className={styles.colorDots}>
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className={styles.colorDot}
                        style={{ background: COLOR_MAP[c] || '#ccc' }}
                        title={c.replace('_', ' ')}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
