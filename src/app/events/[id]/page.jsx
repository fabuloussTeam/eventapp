'use client'
import { useState, useEffect } from 'react' // Ajout de l'import manquant
import { useRouter, useParams } from 'next/navigation'
import styles from '@/styles/EventDetail.module.css'

export default function EventDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  // Charger l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`)
        if (!res.ok) throw new Error('Événement non trouvé')
        const data = await res.json()
        setEvent(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  // Supprimer l'événement
  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) throw new Error(await res.text())
      
      router.push('/events')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Échec de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <div className={styles.loading}>Chargement...</div>
  if (!event) return <div className={styles.error}>Événement non trouvé</div>

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button 
          onClick={() => router.back()} 
          className={styles.secondaryButton}
        >
          &larr; Retour
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={styles.deleteButton}
        >
          {deleting ? 'Suppression...' : 'Supprimer'}
        </button>
      </div>
      
      <h1>{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className={styles.image} />
      
      <div className={styles.details}>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString('fr-FR')}</p>
        <p><strong>Lieu:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>
    </div>
  )
}