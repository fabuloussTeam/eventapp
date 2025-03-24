// src/app/events/[eventId]/page.jsx
import { notFound } from 'next/navigation'
import events from '@/data/events.json'

export default function EventDetails({ params }) {
  // Directly access params.eventId (no await needed for static params)
  const event = events.find(e => e.id === Number(params.eventId))

  if (!event) {
    notFound()
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>{event.title}</h1>
      <img 
        src={event.images[0]} 
        alt={event.title} 
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <div style={{ marginTop: '2rem' }}>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()} à {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p style={{ marginTop: '1rem' }}>{event.description}</p>
      </div>
    </div>
  )
}