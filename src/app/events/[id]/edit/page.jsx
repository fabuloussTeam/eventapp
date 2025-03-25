'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from '@/styles/Form.module.css'

export default function EditEvent() {
  const router = useRouter()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  })
  const [imagePreview, setImagePreview] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Charger les données existantes
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`)
        if (!res.ok) throw new Error('Événement non trouvé')
        const data = await res.json()
        
        setFormData({
          title: data.title,
          date: data.date.split('T')[0],
          location: data.location,
          description: data.description
        })
        setCurrentImage(data.imageUrl)
      } catch (error) {
        console.error(error)
        router.push('/events')
      }
    }
    fetchEvent()
  }, [id, router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('date', formData.date)
    formDataToSend.append('location', formData.location)
    formDataToSend.append('description', formData.description)
    
    if (imagePreview) {
      formDataToSend.append('image', e.target.image.files[0])
    }

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        body: formDataToSend
      })

      if (!res.ok) throw new Error(await res.text())
      router.push(`/events/${id}`)
    } catch (error) {
      console.error('Error:', error)
      alert('Échec de la modification')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Modifier l'événement</h1>
      
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label>Titre *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date *</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Lieu *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {(imagePreview || currentImage) && (
            <div className={styles.imagePreview}>
              <img 
                src={imagePreview || currentImage} 
                alt="Preview" 
              />
              <p>{imagePreview ? "Nouvelle image" : "Image actuelle"}</p>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push(`/events/${id}`)}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}