import styles from '../../styles/DashBoard.module.css'
import Calendar from '../../components/calendar'
import { signOut, getSession } from 'next-auth/react'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import ListPage from './listPage'
import { prisma } from '../../lib/db'
import Spinner from '../../components/Spinner'
import { useRouter } from 'next/router'
import { LABELS_PAGE, LOGIN_PAGE } from '../../utils/routes'
import { useIsClient } from '../../hooks/useIsClient'
import Modal from 'react-modal'
import AddItemForm from '../../components/AddItemForm'
import { motion } from 'framer-motion'

Modal.setAppElement('#__next')

export default function Dashboard({ session, doesNotHaveLabelsSetup }) {
  const [loggingOut, setLoggingOut] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

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
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <h1>The Navbar goes here</h1>
          <div className={`${styles.logoutButton}`}>
            {loggingOut ? (
              <PulseLoader color="#0d6efd" />
            ) : (
              <>
                <button
                  className={`${styles.button} btn btn-primary`}
                  onClick={openCalendarModal}
                >
                  Calendar
                </button>
                <button
                  className={`${styles.button} btn btn-primary`}
                  onClick={openModal}
                >
                  Add Task
                </button>
                <button
                  className={`${styles.button} btn btn-primary`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.left}>
          <ListPage listDate={selectedDate} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
        transparent={true}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: 0,
          },
        }}
      >
        <motion.div
          animate={{ scale: 0.9, opacity: 1 }}
          initial={{ scale: 0, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <AddItemForm closeModal={closeModal} />
        </motion.div>
      </Modal>

      <Modal
        isOpen={isCalendarModalOpen}
        onRequestClose={closeCalendarModal}
        contentLabel="Calendar Modal"
        transparent={true}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: 0,
            width: '50%',
            height: '70%',
          },
        }}
      >
        <motion.div
          animate={{ scale: 0.9, opacity: 1 }}
          initial={{ scale: 0, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <Calendar
            closeModal={closeCalendarModal}
            setListSelectedDate={setSelectedDate}
          />
        </motion.div>
      </Modal>
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
