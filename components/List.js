import { Star, Calendar } from 'lucide-react'
import ListItem from './ListItem'
import styles from '../styles/List.module.css'
import Spinner from './Spinner'
import { randomId } from '../utils/randomId'

export default function List({ todos, isTodoListLoading, isToday }) {
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
      <div className={styles.headingContainer}>
        {isToday ? (
          <Star size={40} strokeWidth={0.75} fill="#fef9c3" />
        ) : (
          <Calendar size={40} strokeWidth={0.75} />
        )}
        <h1
          style={{
            fontSize: '1.8rem',
            margin: 0,
          }}
        >
          {isToday ? "Today's Todos" : 'Todos for ...'}
        </h1>
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
