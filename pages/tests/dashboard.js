import styles from '../../styles/DashBoard.module.css'
import Calendar from '../../components/calendar'
import { signOut, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import List from './listPage'
import PieChart from '../../components/PieChart'
import { prisma } from '../../lib/db'
import Spinner from '../../components/Spinner'
import { useRouter } from 'next/router'
import { LABELS_PAGE } from '../../utils/routes'

export default function Dashboard({ session, doesNotHaveLabelsSetup }) {
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (doesNotHaveLabelsSetup) {
      router.push(LABELS_PAGE)
    }
  }, [])

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
    return null
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await signOut()
    window.location.href = '/'
  }

  if (doesNotHaveLabelsSetup) {
    return <Spinner fullPageSpinner />
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <h1>The Navbar goes here</h1>
          <div className={`${styles.logoutButton}`}>
            {loggingOut ? (
              <PulseLoader color="#0d6efd" />
            ) : (
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.left}>
          <List />
        </div>
        <div className={styles.right}>
          <div className={`${styles.top} ${styles.fullHeight}`}>
            <Calendar />
          </div>
          <div className={`${styles.bottom} ${styles.fullHeight}`}>
            <PieChart />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let labels = []
  if (session?.user?.email) {
    labels = await prisma.label.findMany({
      where: {
        userEmail: session?.user?.email,
      },
    })
  }
  return {
    props: {
      session: session ? session : null,
      doesNotHaveLabelsSetup: !(labels?.length > 0),
    },
  }
}
