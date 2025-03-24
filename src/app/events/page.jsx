'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import styles from '@/styles/Layout.module.css'

export default function EventsPage() {
  const router = useRouter()
  const { id } = useParams()
  const [events, setEvents] = useState([])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  // Supprimer l'événement
  const handleDelete = async (eventId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) throw new Error(await res.text())
      
      setEvents(events.filter(event => event.id !== eventId)) // Update the state to remove the deleted event
    } catch (error) {
      console.error('Erreur:', error)
      alert('Échec de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nos Événements</h1>
      <div className={styles.grid}>
        {events.map(event => (
          <div key={event.id} className={styles.card}>
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className={styles.image}
            />
            <div className={styles.content}>
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
              <Link href={`/events/${event.id}`} className={styles.button}>
                Voir détails
              </Link>
              <button
                onClick={() => handleDelete(event.id)}
                disabled={deleting}
                className={styles.deleteButton}
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}