import styles from '../styles/DashBoard.module.css'
import { HashLoader } from 'react-spinners'

export default function NavBarBase({ children, loggingOut }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={`${styles.heading}`}>
          <h1 className={styles.textShadow}><b>HARMONY</b> hub</h1>
        </div>
        <div className={`${styles.logoutButton}`}>
          {loggingOut ? (
            <HashLoader
              size={30}
              color="#0d6efd"
              className={styles.logoutAnimation}
            />
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </nav>
  )
}
