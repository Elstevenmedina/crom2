import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
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
      setIsActive(category.is_active ?? true)
      setImagePreview(category.image_url || '')
    }
  }, [category])

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
      .from('category-images')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('category-images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let imageUrl = category?.image_url || ''

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const categoryData = {
        name,
        is_active: isActive,
        image_url: imageUrl,
      }

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', category.id)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('categories')
          .insert([categoryData])

        if (insertError) throw insertError
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
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id)

      if (deleteError) throw deleteError
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
