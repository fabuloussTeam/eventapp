'use client'
import styles from './Member.module.css'

const Member = ({ member }) => {
  return (
    <div className={styles.member}>
      <img 
        src={member.image} 
        alt={member.name} 
        className={styles.image}
      />
      <div className={styles.content}>
        <h3>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.bio}>{member.bio}</p>
      </div>
    </div>
  )
}

export default Member