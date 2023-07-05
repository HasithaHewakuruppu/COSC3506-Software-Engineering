import {
  format,
  isBefore,
  isSameDay,
  isToday as isTodayDateFns,
} from 'date-fns'
import { CalendarCheck, CalendarDays, Star } from 'lucide-react'
import { useState } from 'react'
import styles from '../styles/List.module.css'
import { randomId } from '../utils/randomId'
import ListItem from './ListItem'
import Spinner from './Spinner'
import { AnimatePresence, motion } from 'framer-motion'

export default function List({ todos, isTodoListLoading, listURL }) {
  const [isOverdueBannerDismissed, setIsOverdueBannerDismissed] =
    useState(false)
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // const isToday = isTodayDateFns(listDate) // the listDate needs to be extracted from the listURL

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
        {/* <ListHeader listDate={listDate} isToday={isToday} /> */}
        <p>Temp for now...</p>
      </div>
      <AnimatePresence>
        {!isOverdueBannerDismissed && (
          <OverdueTodosBanner
            todos={todos}
            hideOverdueTodos={Boolean(listURL)}
            setIsOverdueBannerDismissed={setIsOverdueBannerDismissed}
            isOverdueBannerDismissed={isOverdueBannerDismissed}
          />
        )}
      </AnimatePresence>
      <div className={styles.listContainer}>
        {todos &&
          todos.map((item) => (
            <ListItem
              key={randomId(20)}
              todoid={item.id} // create prop for id
              title={item.title}
              duration={formatDuration(item.duration)}
              description={item.description}
              category={item.label.category}
              label={item.label.name}
              date={item.date}
              overdue={new Date(item.date) < currentDate}
              listURL={listURL}
            />
          ))}
      </div>
    </div>
  )
}

function OverdueTodosBanner({ todos, setIsOverdueBannerDismissed }) {
  const countOverdueTodos = todos.filter(
    (t) =>
      isBefore(new Date(t.date), new Date()) &&
      !isSameDay(new Date(t.date), new Date())
  ).length

  if (countOverdueTodos === 0) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={styles.overdueTodosBannerWrapepr}>
        <h3 className={styles.overdueTodosTitle}>
          ~ Gentle reminder you have {countOverdueTodos} todos that need your
          attenion ~
        </h3>
        <button
          className={styles.overdueTodosOkButton}
          onClick={() => setIsOverdueBannerDismissed(true)}
        >
          OK
        </button>
      </div>
    </motion.div>
  )
}

// function ListHeader({ isToday, listDate }) {
//   if (isToday) {
//     return (
//       <>
//         <CalendarCheck size={40} strokeWidth={0.75} fill="#f2f2f2" />
//         <h1
//           style={{
//             fontSize: '1.8rem',
//             margin: 0,
//           }}
//         >
//           Today&apos;s Todos
//         </h1>
//       </>
//     )
//   } else if (!listURL) {
//     return (
//       <>
//         <Star size={40} strokeWidth={0.75} fill="#fef9c3" />
//         <h1
//           style={{
//             fontSize: '1.8rem',
//             margin: 0,
//           }}
//         >
//           All My Todos
//         </h1>
//       </>
//     )
//   }
//   return (
//     <>
//       <CalendarDays size={40} strokeWidth={0.75} fill="#f2f2f2" />
//       <h1
//         style={{
//           fontSize: '1.8rem',
//           margin: 0,
//         }}
//       >
//         {'Todos for ' + format(listDate, 'cccc MMMM do')}
//       </h1>
//     </>
//   )
// }
