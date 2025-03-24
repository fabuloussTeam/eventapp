'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/Form.module.css'

export default function AddEventPage() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Vérification du type de fichier
    if (!file.type.match('image.*')) {
      setError('Veuillez sélectionner une image valide (JPEG, PNG)')
      return
    }

    // Vérification de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB')
      return
    }

    setError('')
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('date', new Date(formData.date).toISOString())
      formDataToSend.append('location', formData.location)
      formDataToSend.append('description', formData.description)
      
      if (fileInputRef.current.files[0]) {
        formDataToSend.append('image', fileInputRef.current.files[0])
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de l\'envoi')
      }

      router.push('/events')
    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ajouter un Événement</h1>
      
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label htmlFor="title">Titre de l'événement *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Concert, Festival..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date et heure *</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Lieu *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Salle des fêtes, Paris..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Décrivez votre événement..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image de l'événement *</label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
            required
          />
          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <img 
                src={imagePreview} 
                alt="Aperçu de l'image" 
                className={styles.imagePreview}
              />
              <button
                type="button"
                className={styles.removeImage}
                onClick={() => {
                  setImagePreview(null)
                  fileInputRef.current.value = ''
                }}
              >
                × Supprimer
              </button>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push('/events')}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Envoi en cours...
              </>
            ) : (
              'Publier l\'événement'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}