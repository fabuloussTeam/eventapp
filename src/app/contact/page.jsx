import styles from '@/styles/Layout.module.css'

export default function ContactPage() {
  return (
    <>
      <h1 className={styles.title}>Contactez-nous</h1>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        backgroundColor: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px var(--card-shadow)'
      }}>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Nom</label>
            <input 
              type="text" 
              id="name" 
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '4px', 
                border: '1px solid #ddd',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)'
              }} 
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              id="email" 
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '4px', 
                border: '1px solid #ddd',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)'
              }} 
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
            <textarea 
              id="message" 
              rows="5" 
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '4px', 
                border: '1px solid #ddd',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)'
              }}
            ></textarea>
          </div>
          <button 
            type="submit" 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer'
            }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  )
}