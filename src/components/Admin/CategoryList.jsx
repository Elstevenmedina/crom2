import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import styles from './CategoryList.module.css'

function CategoryList({ onEdit, onAdd }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const items = await api.get('/categories/admin')
      setCategories(items)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (loading) {
    return <div className={styles.loading}>Cargando categorías...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.count}>{categories.length} categoría(s)</p>
        <button onClick={onAdd} className={styles.addBtn}>
          + Nueva Categoría
        </button>
      </div>

      {categories.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay categorías registradas.</p>
          <button onClick={onAdd} className={styles.addBtn}>
            Crear primera categoría
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.card}
              onClick={() => onEdit(category)}
            >
              <div className={styles.imageWrapper}>
                {category.imageUrl ? (
                  <img src={category.imageUrl} alt={category.name} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>Sin imagen</div>
                )}
                <span className={`${styles.badge} ${category.isActive ? styles.badgeActive : styles.badgeInactive}`}>
                  {category.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList
