import styles from '../styles/DashBoard.module.css'
import Calendar from '../components/calendar'
import { signOut, getSession } from 'next-auth/react'
import { useState } from 'react'
import ListPage from '../components/ListPage'
import { prisma } from '../lib/db'
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'
import { LABELS_PAGE, LOGIN_PAGE } from '../utils/routes'
import { useIsClient } from '../hooks/useIsClient'
import Modal from 'react-modal'
import AddItemForm from '../components/AddItemForm'
import FilterItemForm from '../components/FilterItemForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import NavBarBase from '../components/NavBarBase'

Modal.setAppElement('#__next')

export default function Dashboard({ session, doesNotHaveLabelsSetup }) {
  const [loggingOut, setLoggingOut] = useState(false)
  const [listURL, setListURL] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const router = useRouter()
  const isClient = useIsClient()

  if (isClient && doesNotHaveLabelsSetup) {
    router.push(LABELS_PAGE)
  }

  if (isClient && !session) {
    router.push(LOGIN_PAGE)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function openCalendarModal() {
    setIsCalendarModalOpen(true)
  }

  function closeCalendarModal() {
    setIsCalendarModalOpen(false)
  }

  function openFilterModal() {
    setIsFilterModalOpen(true)
  }

  function closeFilterModal() {
    setIsFilterModalOpen(false)
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
            DashBoard
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
