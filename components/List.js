import ListItem from './ListItem'
import styles from '../styles/List.module.css'
import Spinner from './Spinner'
import { randomId } from '../utils/randomId'

export default function List({ todos, isTodoListLoading }) {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

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

  if (isTodoListLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItemms: 'center',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.upperSubContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.faviconContainer}>
            {todos ? (
              <i className={`fa fa-list ${styles.favIcon}`}></i>
            ) : (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
            <p className={styles.content}>Task Lists:</p>
          </div>
          {/* <p className={styles.currentDate}>{listDate}</p> */}
        </div>
      </div>
      <div className={styles.listContainer}>
        {todos &&
          todos.map((item) => (
            <ListItem
              key={randomId(20)}
              title={item.title}
              duration={formatDuration(item.duration)}
              description={item.description}
              category={item.label.category}
              label={item.label.name}
              date={item.date}
              overdue={new Date(item.date) < currentDate}
            />
          ))}
      </div>
    </div>
  )
}
