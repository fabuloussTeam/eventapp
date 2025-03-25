'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/Layout.module.css'

export default function EventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  

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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}