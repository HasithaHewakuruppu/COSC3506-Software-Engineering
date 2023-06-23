import styles from '../styles/ListItem.module.css'
import React, { useState } from 'react'

function ListItem(props) {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  let categoryColor = ''

  switch (props.category) {
    case 'LEISURE':
      categoryColor = styles.categoryLeisure
      break
    case 'WORK':
      categoryColor = styles.categoryWork
      break
    case 'FITNESS':
      categoryColor = styles.categoryFitness
      break
    default:
      categoryColor = styles.categoryNone
      break
  }

  return (
    <div className={`${styles.itemContainer} ${categoryColor}`}>
      <div className={styles.unexpandedContainer}>
        <input type="checkbox" />
        <p className={styles.listItem}>{props.title}</p>
        <p className={styles.time}>{props.duration}</p>
        <div className={styles.favicons}>
          <i
            className={`fa ${expanded ? 'fa-caret-up' : 'fa-caret-down'}`}
            onClick={handleExpand}
          />
        </div>
      </div>
      {expanded && (
        <div className={styles.expandedContainer}>
          <p className={styles.description}>{props.description}</p>
          <div className={styles.favicons}>
            <i className="fa fa-edit"></i>
            <i className="fa fa-trash"></i>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListItem
