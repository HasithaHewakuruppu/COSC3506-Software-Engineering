import styles from '../styles/ListItem.module.css'
import React, { useState } from 'react'

function ListItem(props) {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  let categoryColor = ''
  let labelColor = ''

  switch (props.category) {
    case 'LEISURE':
      categoryColor = styles.categoryLeisure
      labelColor = styles.labelLeisure
      break
    case 'WORK':
      categoryColor = styles.categoryWork
      labelColor = styles.labelWork
      break
    case 'FITNESS':
      categoryColor = styles.categoryFitness
      labelColor = styles.labelFitness
      break
    default:
      categoryColor = styles.categoryNone
      break
  }

  return (
    <div className={`${styles.itemContainer} ${categoryColor}`}>
      <div className={styles.unexpandedContainer}>
        <input type="checkbox" />
        <div className={`${styles.label} ${labelColor}`}>
          <p className={styles.pEdit}>{props.label}</p>
        </div>
        <p className={styles.listItem}>{props.title}</p>
        <p className={styles.pEdit}>{props.duration}</p>
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
            <i className={`${styles.editIcon} fa fa-edit`}></i>
            <i className={`${styles.trashIcon} fa fa-trash`}></i>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListItem