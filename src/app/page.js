import styles from '@/styles/Layout.module.css'
import Member from '@/components/member/Member'
import members from '@/data/members.json'

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Bienvenue sur EventSite</h1>
      <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
        Découvrez les meilleurs événements dans votre région. Que vous soyez fan de musique,
        de sport ou de bien-être, nous avons ce qu'il vous faut!
      </p>
      
      <section>
        <h2 style={{ textAlign: 'center' }}>Notre Équipe</h2>
        <div className={styles.grid}>
          {members.map(member => (
            <Member key={member.id} member={member} />
          ))}
        </div>
      </section>
    </>
  )
}