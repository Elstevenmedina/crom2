import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './DashboardHome.module.css'

function DashboardHome({ onNavigate }) {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    messages: 0,
    visits: null,
  })
  const [recentProducts, setRecentProducts] = useState([])
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }

      const [
        { count: productCount },
        { data: categoryData },
        { count: messageCount },
        { data: recentProds },
        { data: recentMsgs },
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('category'),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5),
      ])

      const uniqueCategories = new Set((categoryData || []).map((p) => p.category).filter(Boolean))

      let visitCount = null
      try {
        const { count } = await supabase.from('page_views').select('*', { count: 'exact', head: true })
        visitCount = count
      } catch {
        visitCount = null
      }

      setStats({
        products: productCount || 0,
        categories: uniqueCategories.size,
        messages: messageCount || 0,
        visits: visitCount,
      })
      setRecentProducts(recentProds || [])
      setRecentMessages(recentMsgs || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  if (loading) {
    return <div className={styles.loading}>Cargando dashboard...</div>
  }

  return (
    <div className={styles.home}>
      {/* Stats */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📦</span>
          <div className={styles.statData}>
            <span className={styles.statNumber}>{stats.products}</span>
            <span className={styles.statLabel}>Productos registrados</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🏷️</span>
          <div className={styles.statData}>
            <span className={styles.statNumber}>{stats.categories}</span>
            <span className={styles.statLabel}>Categorías</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>✉️</span>
          <div className={styles.statData}>
            <span className={styles.statNumber}>{stats.messages}</span>
            <span className={styles.statLabel}>Mensajes recibidos</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>👁️</span>
          <div className={styles.statData}>
            <span className={styles.statNumber}>{stats.visits !== null ? stats.visits : 'N/A'}</span>
            <span className={styles.statLabel}>Visitas totales</span>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Accesos rápidos</h2>
        <div className={styles.quickGrid}>
          <button className={styles.quickCard} onClick={() => onNavigate('products', true)}>
            <span className={styles.quickIcon}>➕</span>
            <div>
              <p className={styles.quickLabel}>Nuevo Producto</p>
              <p className={styles.quickDesc}>Registrar un producto nuevo</p>
            </div>
          </button>
          <button className={styles.quickCard} onClick={() => onNavigate('messages')}>
            <span className={styles.quickIcon}>✉️</span>
            <div>
              <p className={styles.quickLabel}>Ver Mensajes</p>
              <p className={styles.quickDesc}>Revisar mensajes de contacto</p>
            </div>
          </button>
          <button className={styles.quickCard} onClick={() => onNavigate('settings')}>
            <span className={styles.quickIcon}>⚙️</span>
            <div>
              <p className={styles.quickLabel}>Configuración</p>
              <p className={styles.quickDesc}>Ajustes del sistema</p>
            </div>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Actividad reciente</h2>
        <div className={styles.activityGrid}>
          {/* Recent Products */}
          <div className={styles.activityCard}>
            <h3 className={styles.activityTitle}>Últimos productos</h3>
            {recentProducts.length === 0 ? (
              <p className={styles.emptyText}>No hay productos aún</p>
            ) : (
              <ul className={styles.activityList}>
                {recentProducts.map((p) => (
                  <li key={p.id} className={styles.activityItem}>
                    <div className={styles.activityItemInfo}>
                      <span className={styles.activityItemName}>{p.name || p.code}</span>
                      <span className={styles.activityItemMeta}>{p.category}</span>
                    </div>
                    <span className={styles.activityDate}>{formatDate(p.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Messages */}
          <div className={styles.activityCard}>
            <h3 className={styles.activityTitle}>Últimos mensajes</h3>
            {recentMessages.length === 0 ? (
              <p className={styles.emptyText}>No hay mensajes aún</p>
            ) : (
              <ul className={styles.activityList}>
                {recentMessages.map((m) => (
                  <li key={m.id} className={styles.activityItem}>
                    <div className={styles.activityItemInfo}>
                      <span className={styles.activityItemName}>{m.full_name}</span>
                      <span className={styles.activityItemMeta}>{m.email}</span>
                    </div>
                    <span className={styles.activityDate}>{formatDate(m.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardHome
