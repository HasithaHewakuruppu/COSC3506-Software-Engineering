import { Star } from 'lucide-react'
import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import NavBarBase from '../components/NavBarBase'
import PieChart from '../components/PieChart'
import Spinner from '../components/Spinner'
import Sunburst from '../components/Sunburst'
import { useIsClient } from '../hooks/useIsClient'
import TodoStats from '../lib/TodoStats'
import { prisma } from '../lib/db'
import { fetcher } from '../lib/fetcher'
import styles from '../styles/Balance.module.css'
import { API_ENDPOINTS, LABELS_PAGE, LOGIN_PAGE } from '../utils/routes'

export default function Balance({ session, doesNotHaveLabelsSetup }) {
  const [loggingOut, setLoggingOut] = useState(false)

  const router = useRouter()
  const isClient = useIsClient()

  if (isClient && doesNotHaveLabelsSetup) {
    router.push(LABELS_PAGE)
  }

  if (isClient && !session) {
    router.push(LOGIN_PAGE)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await signOut()
    window.location.href = '/'
  }

  if (doesNotHaveLabelsSetup || !session) {
    return <Spinner fullPageSpinner />
  }

  const { data, error } = useSWR(API_ENDPOINTS.GET_TODOS_WITH_LABELS, fetcher)

  if (error) return <p>Error loading page.</p>
  else if (!data) return <Spinner fullPageSpinner />

  const todoStatsAll = new TodoStats(data)
  const todoStatsCompleted = new TodoStats(
    data.filter((todo) => todo.completed)
  )

  return (
    <>
      <NavBarBase loggingOut={loggingOut}>
        <Link href="./dashboard">
          <button className={`${styles.button} btn btn-primary`}>
            Dashboard
          </button>
        </Link>
        <button
          className={`${styles.button} btn btn-primary`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </NavBarBase>

      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <Star size={40} strokeWidth={0.75} fill="#fef9c3" />
          <h1
            style={{
              fontSize: '1.8rem',
              margin: 0,
            }}
          >
            Your balance
          </h1>
        </div>
        <PieChart
          data={todoStatsAll.getDurationsByUpperCategory()}
          title={'Planned'}
          width={500}
        />
        <PieChart
          data={todoStatsCompleted.getDurationsByUpperCategory()}
          title={'Completed'}
          width={500}
        />
        <Sunburst
          data={todoStatsAll.getDurationsByCategory()}
          title={'Planned'}
          width={500}
        />
        <Sunburst
          data={todoStatsCompleted.getDurationsByCategory()}
          title={'Completed'}
          width={500}
        />
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
