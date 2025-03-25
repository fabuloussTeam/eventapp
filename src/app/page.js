import styles from '@/styles/Layout.module.css'
import Member from '@/components/member/Member'
import members from '@/data/members.json'

export default function Home() {

  /**
   *   Participant du projet: EVALUATION SOMATIVE 2
   *      - Kemgue Philippe
   *      - Emmanuel Tjom
   *      - Aboubacar cisse
   *      - Ismail Hussain Ali
   *      - Mahdjat Lydia
   *      - Cheikh Ahmadou Bamba Loum
   * 
   *  Professeur: Mme Mouna Tebourski
   */

  return (
    <>
      <h1 className={styles.title}>Bienvenue sur EventSite</h1>
      <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
        Cette application web, est projet de groupe dans le cadre de la formation a la Cite collegiale.
        Ce projet est superviser par notre professeur Madame <span className={styles.profName}>Mouna Tebourski</span>.
      </p>
      
      <section>
        <h2 style={{ textAlign: 'center' }}>Notre College</h2>
        <div className={styles.grid}>
          {members.map(member => (
            <Member key={member.id} member={member} />
          ))}
        </div>
      </section>
    </>
  )
}