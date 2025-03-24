import { ThemeProvider } from '@/components/theme/ThemeContext'
import Header from '@/components/header/Header'
import '@/styles/globals.css'
import styles from '@/styles/Layout.module.css'
import AddEventButton from '@/components/AddEventButton'

export const metadata = {
  title: 'EventSite - Vos événements préférés',
  description: 'Découvrez les meilleurs événements dans votre région',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-theme="light">{/* Pas d'espace ou retour à la ligne ici */}
      <body>
        <ThemeProvider>
          <Header />
          <main className={styles.main}>
            <div className={styles.container}>
              {children}
            </div>
          </main>
		  <AddEventButton />
          <footer style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            backgroundColor: 'var(--primary-color)', 
            color: 'white'
          }}>
            © 2025 EventSite - Tous droits réservés
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}