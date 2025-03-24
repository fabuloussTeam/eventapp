// src/components/theme/ThemeToggle.jsx
'use client'
import { useTheme } from './ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={`Changer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <span className={styles.slider} data-theme={theme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  )
}