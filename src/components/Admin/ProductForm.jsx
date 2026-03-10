import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './ProductForm.module.css'

const FIXED_CATEGORIES = [
  { value: 'bolsos', label: 'Mochilas escolares' },
  { value: 'bolsos_viaje', label: 'Bolsos de viaje' },
  { value: 'cartucheras', label: 'Cartucheras' },
  { value: 'mochilas', label: 'Mochilas' },
  { value: 'loncheras', label: 'Loncheras' },
  { value: 'maletas', label: 'Maletas de viaje' },
]

function ProductForm({ product, onSave, onCancel }) {
  const isEditing = !!product

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [category, setCategory] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [features, setFeatures] = useState([])
  const [newFeature, setNewFeature] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (product) {
      setName(product.name || '')
      setCode(product.code || '')
      setCategory(product.category || '')
      setIsActive(product.is_active ?? true)
      setImagePreview(product.image_url || '')
      setFeatures(product.features || [])
    }
  }, [product])

  const addFeature = () => {
    const trimmed = newFeature.trim()
    if (trimmed && !features.includes(trimmed)) {
      setFeatures([...features, trimmed])
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleFeatureKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addFeature()
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let imageUrl = product?.image_url || ''

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const productData = {
        name,
        code,
        category: category || null,
        is_active: isActive,
        image_url: imageUrl,
        features,
      }

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData])

        if (insertError) throw insertError
      }

      onSave()
    } catch (err) {
      setError(err.message || 'Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

    setLoading(true)
    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (deleteError) throw deleteError
      onSave()
    } catch (err) {
      setError(err.message || 'Error al eliminar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <button onClick={onCancel} className={styles.backBtn}>
          ← Volver
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label}>Código *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={styles.input}
              placeholder="Ej: CROM-001"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Nombre *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Nombre del producto"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Categoría *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.input}
              required
            >
              <option value="">Seleccionar categoría</option>
              {FIXED_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className={styles.checkbox}
              />
              Producto activo
            </label>
          </div>
        </div>

        <div className={styles.imageSection}>
          <label className={styles.label}>Imagen del producto</label>
          <div className={styles.imageUpload}>
            {imagePreview ? (
              <div className={styles.previewWrapper}>
                <img src={imagePreview} alt="Preview" className={styles.preview} />
                <button
                  type="button"
                  className={styles.removeImage}
                  onClick={() => {
                    setImageFile(null)
                    setImagePreview('')
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className={styles.uploadArea}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                <span className={styles.uploadText}>
                  Haz clic para subir una imagen
                </span>
              </label>
            )}
          </div>
        </div>

        <div className={styles.featuresSection}>
          <label className={styles.label}>Características del producto</label>
          <div className={styles.featureInput}>
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={handleFeatureKeyDown}
              className={styles.input}
              placeholder="Ej: Mosquitero, Ruedas con freno..."
            />
            <button type="button" onClick={addFeature} className={styles.addFeatureBtn}>
              Agregar
            </button>
          </div>
          {features.length > 0 && (
            <ul className={styles.featureList}>
              {features.map((feat, i) => (
                <li key={i} className={styles.featureItem}>
                  <span>{feat}</span>
                  <button type="button" onClick={() => removeFeature(i)} className={styles.removeFeatureBtn}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.actions}>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteBtn}
              disabled={loading}
            >
              Eliminar
            </button>
          )}
          <div className={styles.rightActions}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Producto'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
