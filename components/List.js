import {
  format,
  isBefore,
  isSameDay,
  isToday as isTodayDateFns,
} from 'date-fns'
import { CalendarCheck, CalendarDays, Star } from 'lucide-react'
import { useState } from 'react'
import styles from '../styles/List.module.css'
import ListItem from './ListItem'
import Spinner from './Spinner'
import { AnimatePresence, motion } from 'framer-motion'

export default function List({
  todos,
  isTodoListLoading,
  listURL,
  setSortType,
}) {
  const [isOverdueBannerDismissed, setIsOverdueBannerDismissed] =
    useState(false)
  const [isOverdueBannerDisplayed, setIsOverdueBannerDisplayed] =
    useState(false)
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  let listDate = null

  if (listURL) {
    const dateIndex = listURL.indexOf('date=')
    if (dateIndex !== -1) {
      // Extract the substring from "date=" until the end of the URL
      const dateSubstring = listURL.substring(dateIndex + 'date='.length)

      // Extract the day, month, and year components
      const [day, month, year] = dateSubstring.split('-')

      // Create a new Date object with individual components
      listDate = new Date(year, month - 1, day)
    }
  }

  const isToday = isTodayDateFns(listDate) // the listDate needs to be extracted from the listURL, the old url that is...

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
    <div className={styles.mainContainer}>
      <div className={styles.navbarContent}>
        <div className={styles.headingContainer}>
          <ListHeader listDate={listDate} isToday={isToday} listURL={listURL} />
        </div>
        <div className={styles.sortContainer}>
          <label>Sort by</label>
          <select
            onChange={(event) => {
              const selectedValue = event.target.value
              setSortType(selectedValue)
            }}
          >
            <option value="Date">Date</option>
            <option value="Duration">Duration</option>
            <option value="Label">Label</option>
          </select>
        </div>
      </div>
      <AnimatePresence>
        {!isOverdueBannerDismissed && (
          <OverdueTodosBanner
            todos={todos}
            hideOverdueTodos={Boolean(listURL)}
            setIsOverdueBannerDismissed={setIsOverdueBannerDismissed}
            isOverdueBannerDismissed={isOverdueBannerDismissed}
            setIsOverdueBannerDisplayed={setIsOverdueBannerDisplayed}
          />
        )}
      </AnimatePresence>
      <div
        className={
          isOverdueBannerDisplayed
            ? styles.listContainerWithOverdueTodos
            : styles.listContainer
        }
      >
        {todos &&
          todos.map((item) => (
            <ListItem
              key={item.id}
              todoid={item.id}
              title={item.title}
              duration={formatDuration(item.duration)}
              description={item.description}
              category={item.label.category}
              label={item.label.name}
              labelID={item.label.id}
              date={item.date}
              overdue={new Date(item.date) < currentDate && !item.completed}
              listURL={listURL}
              completed={item.completed}
              durationInMiliSeconds={item.duration}
            />
          ))}
      </div>
    </div>
  )
}

function OverdueTodosBanner({
  todos,
  setIsOverdueBannerDismissed,
  setIsOverdueBannerDisplayed,
}) {
  const countOverdueTodos = todos.filter(
    (t) =>
      isBefore(new Date(t.date), new Date()) &&
      !isSameDay(new Date(t.date), new Date()) &&
      !t.completed
  ).length

  if (countOverdueTodos === 0) {
    return null
  }

  setIsOverdueBannerDisplayed(true)

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={styles.overdueTodosBannerWrapepr}>
        <h3 className={styles.overdueTodosTitle}>
          ~ Gentle reminder you have {countOverdueTodos} todos that need your
          attenion ~
        </h3>
        <button
          className={styles.overdueTodosOkButton}
          onClick={() => {
            setIsOverdueBannerDisplayed(false)
            setIsOverdueBannerDismissed(true)
          }}
        >
          OK
        </button>
      </div>
    </motion.div>
  )
}

function ListHeader({ isToday, listDate, listURL }) {
  if (isToday) {
    return (
      <>
        <CalendarCheck size={40} strokeWidth={0.75} fill="#f2f2f2" />
        <h1
          style={{
            fontSize: '1.8rem',
            margin: 0,
          }}
        >
          Today&apos;s Todos
        </h1>
      </>
    )
  } else if (!listURL) {
    return (
      <>
        <Star size={40} strokeWidth={0.75} fill="#fef9c3" />
        <h1
          style={{
            fontSize: '1.8rem',
            margin: 0,
          }}
        >
          All My Todos
        </h1>
      </>
    )
  } else if (listDate) {
    return (
      <>
        <CalendarDays size={40} strokeWidth={0.75} fill="#f2f2f2" />
        <h1
          style={{
            fontSize: '1.8rem',
            margin: 0,
          }}
        >
          {'Todos for ' + format(listDate, 'cccc MMMM do')}
        </h1>
      </>
    )
  } else {
    return (
      <>
        <CalendarDays size={40} strokeWidth={0.75} fill="#f2f2f2" />
        <h1
          style={{
            fontSize: '1.8rem',
            margin: 0,
          }}
        >
          {'Filtered Todos'}
        </h1>
      </>
    )
  }
}
