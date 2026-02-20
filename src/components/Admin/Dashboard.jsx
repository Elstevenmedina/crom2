import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ProductList from './ProductList'
import ProductForm from './ProductForm'
import ContactMessages from './ContactMessages'
import AdminSettings from './AdminSettings'
import styles from './Dashboard.module.css'

const tabs = [
  { key: 'products', label: 'Productos', icon: '📦' },
  { key: 'messages', label: 'Mensajes', icon: '✉️' },
  { key: 'settings', label: 'Configuración', icon: '⚙️' },
]

function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowProductForm(true)
  }

  const handleNewProduct = () => {
    setSelectedProduct(null)
    setShowProductForm(true)
  }

  const handleProductSaved = () => {
    setShowProductForm(false)
    setSelectedProduct(null)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        if (showProductForm) {
          return (
            <ProductForm
              product={selectedProduct}
              onSave={handleProductSaved}
              onCancel={() => {
                setShowProductForm(false)
                setSelectedProduct(null)
              }}
            />
          )
        }
        return (
          <ProductList
            onEdit={handleEditProduct}
            onAdd={handleNewProduct}
          />
        )
      case 'messages':
        return <ContactMessages />
      case 'settings':
        return <AdminSettings />
      default:
        return null
    }
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/assets/Home/logo.png" alt="CROM" className={styles.logo} />
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.navItem} ${activeTab === tab.key ? styles.navItemActive : ''}`}
              onClick={() => {
                setActiveTab(tab.key)
                setShowProductForm(false)
                setSelectedProduct(null)
              }}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              <span className={styles.navLabel}>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>
            {tabs.find((t) => t.key === activeTab)?.label}
          </h1>
        </header>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
