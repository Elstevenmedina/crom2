import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import styles from './ProductList.module.css'

const CATEGORY_LABELS = {
  bolsos: 'Mochilas escolares',
  bolsos_viaje: 'Bolsos de viaje',
  cartucheras: 'Cartucheras',
  mochilas: 'Mochilas',
  loncheras: 'Loncheras',
  maletas: 'Maletas de viaje',
}

function ProductList({ onEdit, onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { items } = await api.get('/products/admin?limit=200')
      setProducts(items)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
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
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>Sin imagen</div>
                )}
                <span className={`${styles.badge} ${product.isActive ? styles.badgeActive : styles.badgeInactive}`}>
                  {product.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productCode}>{product.code}</p>
                {product.category && (
                  <p className={styles.productCategory}>{CATEGORY_LABELS[product.category] || product.category}</p>
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
