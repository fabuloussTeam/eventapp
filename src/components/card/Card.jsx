'use client'
import Link from 'next/link'
import styles from './Card.module.css'

const Card = ({ event }) => {
  return (
    <div className={styles.card}>
      <img 
        src={event.images[0]} 
        alt={event.title} 
        className={styles.image}
      />
      <div className={styles.content}>
        <h3>{event.title}</h3>
        <p className={styles.date}>
          {new Date(event.date).toLocaleDateString()} à {event.time}
        </p>
        <p className={styles.location}>{event.location}</p>
        <Link href={`/events/${event.id}`} className={styles.button}>
          Voir détails
        </Link>
      </div>
    </div>
  )
}

export default Card