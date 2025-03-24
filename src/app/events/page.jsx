'use client'
import styles from '@/styles/Layout.module.css'
import Card from '@/components/card/Card'
import events from '@/data/events.json'

export default function EventsPage() {
  return (
    <>
      <h1 className={styles.title}>Nos Événements</h1>
      <div className={styles.grid}>
        {events.map(event => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}