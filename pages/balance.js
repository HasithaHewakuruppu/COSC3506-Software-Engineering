import styles from '../styles/Balance.module.css'
import { signOut, getSession } from 'next-auth/react'
import { useState } from 'react'
import { prisma } from '../lib/db'
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'
import { LABELS_PAGE, LOGIN_PAGE } from '../utils/routes'
import { useIsClient } from '../hooks/useIsClient'
import Link from 'next/link'
import NavBarBase from '../components/NavBarBase'
import PieChart from '../components/PieChart'
import { fetcher } from '../lib/fetcher'
import { API_ENDPOINTS } from '../utils/routes'
import useSWR from 'swr'
import TodoStats from '../lib/TodoStats'
import { Star } from 'lucide-react'

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

  console.log(data)
  const todoStatsAll = new TodoStats(data).getDurationsByUpperCategory()
  const todoStatsCompleted = new TodoStats(
    data.filter((todo) => todo.completed)
  ).getDurationsByUpperCategory()

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
      {}

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
        <PieChart data={todoStatsAll} title={'Planned'} width={500} />
        <PieChart data={todoStatsCompleted} title={'Completed'} width={500} />
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
