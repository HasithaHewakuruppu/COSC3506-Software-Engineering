import React, { useState } from 'react'
import Modal from 'react-modal'
import AddItemForm from './AddItemForm'
import ListItem from './ListItem'
import styles from '../styles/List.module.css'
import Spinner from './Spinner'
import { motion } from 'framer-motion'
import { randomId } from '../utils/randomId'

Modal.setAppElement('#__next')

export default function List({ items, mutateListForToday }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentDate = new Date().toLocaleDateString('en-GB')

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / (60 * 60 * 1000))
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000))

    let formattedDuration = ''
    if (hours > 0) {
      formattedDuration += `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`
    }
    if (minutes > 0) {
      if (formattedDuration !== '') {
        formattedDuration += ' '
      }
      formattedDuration += `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'}`
    }

    return formattedDuration
  }

  return (
    <div>
      <div className={styles.upperSubContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.faviconContainer}>
            {items ? (
              <i className={`fa fa-list ${styles.favIcon}`}></i>
            ) : (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
            <p className={styles.content}>Task Lists:</p>
          </div>
          <p className={styles.currentDate}>{currentDate}</p>
        </div>
      </div>
      <div className={styles.listContainer}>
        {items &&
          items.map((item) => (
            <ListItem
              key={randomId(20)}
              title={item.title}
              duration={formatDuration(item.duration)}
              description={item.description}
              category={item.label.category}
              label={item.label.name}
            />
          ))}
      </div>
      <div className={styles.lowerSubContainer}>
        <button
          className={`${styles.button} btn btn-primary`}
          onClick={openModal}
        >
          <p className={styles.content}>Add Task</p>
        </button>
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
            marginRight: '-50%',
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
          <AddItemForm
            closeModal={closeModal}
            mutateListForToday={mutateListForToday}
          />
        </motion.div>
      </Modal>
    </div>
  )
}
