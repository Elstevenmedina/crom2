import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import styles from './CategoryForm.module.css'

function CategoryForm({ category, onSave, onCancel }) {
  const isEditing = !!category

  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (category) {
      setName(category.name || '')
      setIsActive(category.isActive ?? true)
      setImagePreview(category.imageUrl || '')
    }
  }, [category])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let imageUrl = category?.imageUrl || ''
      let imagePublicId = category?.imagePublicId || ''

      if (imageFile) {
        const uploaded = await api.upload('categories', imageFile)
        imageUrl = uploaded.url
        imagePublicId = uploaded.publicId
      }

      const categoryData = {
        name,
        isActive,
        imageUrl,
        imagePublicId,
      }

      if (isEditing) {
        await api.patch(`/categories/${category.id}`, categoryData)
      } else {
        await api.post('/categories', categoryData)
      }

      onSave()
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría? Los productos asociados perderán su categoría.')) return

    setLoading(true)
    try {
      await api.delete(`/categories/${category.id}`)
      onSave()
    } catch (err) {
      setError(err.message || 'Error al eliminar la categoría')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        <button onClick={onCancel} className={styles.backBtn}>
          ← Volver
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Nombre *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Nombre de la categoría"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className={styles.checkbox}
            />
            Categoría activa
          </label>
        </div>

        <div className={styles.imageSection}>
          <label className={styles.label}>Imagen de la categoría</label>
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
              {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Categoría'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
