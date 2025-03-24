'use client'
import Link from 'next/link'
import styles from './Menu.module.css'

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/events">Événements</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu