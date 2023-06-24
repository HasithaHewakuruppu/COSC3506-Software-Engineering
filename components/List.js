import React, { useState } from 'react'
import Modal from 'react-modal'
import AddItemForm from './AddItemForm'
import ListItem from './ListItem'
import styles from '../styles/List.module.css'

Modal.setAppElement('#__next')

export default function List({ items }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentDate = new Date().toLocaleDateString('en-GB')

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className={styles.upperSubContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.faviconContainer}>
            <i className={`fa fa-list ${styles.favIcon}`}></i>
            <p className={styles.content}>Task Lists:</p>
          </div>
          <p className={styles.currentDate}>{currentDate}</p>
        </div>
      </div>
      <div className={styles.listContainer}>
        {items.map((item) => (
          <ListItem
            key={item.title}
            title={item.title}
            duration={item.duration}
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
      >
        <AddItemForm />
      </Modal>
    </div>
  )
}
