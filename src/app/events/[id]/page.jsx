'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from '@/styles/Layout.module.css'

export default function EventDetails() {
  const router = useRouter()
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      router.push('/events')
      return
    }

    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`)
        
        if (!response.ok) {
          throw new Error('Événement non trouvé')
        }

        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error('Erreur:', error)
        router.push('/events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id, router])

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>
  }

  if (!event) {
    return (
      <div className={styles.error}>
        Événement non trouvé
        <button onClick={() => router.push('/events')}>
          Retour aux événements
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} />
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Lieu: {event.location}</p>
      <p>{event.description}</p>
    </div>
  )
}