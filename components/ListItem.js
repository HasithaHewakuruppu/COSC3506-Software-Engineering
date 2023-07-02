import styles from '../styles/ListItem.module.css'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSWRConfig } from 'swr'
import { API_ENDPOINTS } from '../utils/routes'
import categories from '../utils/categories'

function ListItem(props) {
  const { mutate } = useSWRConfig()
  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  let categoryColor = ''
  let labelColor = ''
  const date = new Date(props.date)

  switch (props.category) {
    case categories.LEISURE:
      categoryColor = styles.categoryLeisure
      labelColor = styles.labelLeisure
      break
    case categories.WORK:
      categoryColor = styles.categoryWork
      labelColor = styles.labelWork
      break
    case categories.FITNESS:
      categoryColor = styles.categoryFitness
      labelColor = styles.labelFitness
      break
    default:
      categoryColor = styles.categoryNone
      break
  }

  return (
    <motion.div
      animate={{
        position: 'relative',
        left: 0,
        opacity: 1,
      }}
      initial={{
        position: 'relative',
        left: '-100px',
        opacity: 0,
      }}
    >
      <div className={`${styles.itemContainer} ${categoryColor}`}>
        <div className={styles.unexpandedContainer} onClick={handleExpand}>
          <input
            type="checkbox"
            className={styles.checkbox}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={`${styles.label} ${labelColor}`}>
            <p className={styles.pEdit}>{props.label}</p>
          </div>
          <p className={styles.listItem}>{props.title}</p>
          <p
            className={`${styles.pEdit} ${
              props.overdue ? styles.overdueDate : ''
            }`}
          >
            {date.toLocaleDateString('en-GB')}
          </p>
          <div className={styles.favicons}>
            <i className={`fa ${expanded ? 'fa-caret-up' : 'fa-caret-down'}`} />
          </div>
        </div>
        {expanded && (
          <div className={styles.expandedContainer}>
            <p className={styles.description}>{props.description}</p>
            <div className={styles.todoBottomBarWrapper}>
              <p className={`${styles.pEdit} ${styles.duration}`}>
                {props.duration}
              </p>
              <div className={styles.favicons}>
                <i className={`${styles.editIcon} fa fa-edit`}></i>
                <i
                  className={`${styles.trashIcon} fa fa-trash`}
                  onClick={function wrappingFunction() {
                    deleteTodo(props.todoid, mutate)
                  }}
                ></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

async function deleteTodo(todoid, mutate) {
  try {
    await fetch('/api/todos/' + todoid, {
      method: 'DELETE',
    })
  } catch (e) {
    console.log(e)
  }
  mutate(API_ENDPOINTS.GET_TODOS)
}

export default ListItem
