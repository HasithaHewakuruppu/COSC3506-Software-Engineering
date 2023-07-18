import styles from '../styles/DashBoard.module.css'
import { signOut, getSession } from 'next-auth/react'
import { useState } from 'react'
import { prisma } from '../lib/db'
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'
import { LABELS_PAGE, LOGIN_PAGE } from '../utils/routes'
import { useIsClient } from '../hooks/useIsClient'
import Link from 'next/link'
import NavBarBase from '../components/NavBarBase'

export default function Dashboard({ session, doesNotHaveLabelsSetup }) {
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
        <p>Balance page placeholder</p>
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
