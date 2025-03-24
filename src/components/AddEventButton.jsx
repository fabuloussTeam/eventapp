'use client'
import Link from 'next/link'
import styles from '@/styles/AddButton.module.css'

export default function AddEventButton() {
  return (
    <Link href="/events/add" className={styles.button}>
      +
    </Link>
  )
}