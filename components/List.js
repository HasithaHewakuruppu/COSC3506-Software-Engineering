import React from 'react'
import ListItem from './ListItem'
import styles from '../styles/List.module.css'

export default function List({ items }) {
  const currentDate = new Date().toLocaleDateString('en-GB')

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
        <button className={`${styles.button} btn btn-primary`}>
          <p className={styles.content}>Add Task</p>
        </button>
      </div>
    </div>
  )
}
