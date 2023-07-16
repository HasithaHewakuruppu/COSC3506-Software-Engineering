import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import styles from '../styles/Calendar.module.css'
import { API_ENDPOINTS } from '../utils/routes'
import formatDate from '../utils/formatDate'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Calendar({ closeModal, setListURL }) {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [monthData, setMonthData] = useState([])
  const [highlightedDates, setHighlightedDates] = useState([])
  const { data: todo, error } = useSWR(
    API_ENDPOINTS.GET_TODOS_WITH_LABELS,
    fetcher
  )

  if (error) {
    console.error('Error fetching todos:', error)
  }

  useEffect(() => {
    if (todo) {
      const uniqueDates = [
        ...new Set(
          todo
            .filter((item) => !item.completed) // Filter out completed todos
            .map((item) => {
              const date = new Date(item.date).toLocaleDateString('en-GB')
              return date
            })
        ),
      ]
      setHighlightedDates(uniqueDates)
      console.log(uniqueDates)
    }
  }, [todo])

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDay = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const days = []
    let dayIndex = 0

    // Fill in empty days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push('')
    }

    // Fill in days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i)
    }

    // Fill in empty days after the end of the month
    while (days.length % 7 !== 0 || days.length < 42) {
      days.push('')
    }

    // Create a 2D array of the days in weeks
    const weeks = []
    while (dayIndex < days.length) {
      weeks.push(days.slice(dayIndex, dayIndex + 7))
      dayIndex += 7
    }

    return weeks
  }

  const prevMonth = () => {
    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()
    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1)
    setSelectedDate(prevMonthDate)
  }

  const nextMonth = () => {
    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1)
    setSelectedDate(nextMonthDate)
  }

  const selectDate = (day) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    )
    setSelectedDate(newDate)
    const url = API_ENDPOINTS.GET_TODOS_FOR_DATE + `${formatDate(newDate)}`
    setListURL(url)
    closeModal()
  }

  useEffect(() => {
    const month = selectedDate.getMonth()
    const year = selectedDate.getFullYear()
    const monthData = getMonthData(year, month)
    setMonthData(monthData)
  }, [selectedDate])

  return (
    <section className={styles['ftco-section']}>
      <div className={`${styles['elegant-calencar']} d-md-flex`}>
        <div
          className={`${styles['wrap-header']} wrap-header d-flex align-items-center`}
        >
          <p id={styles.reset} onClick={() => setSelectedDate(today)}>
            reset
          </p>
          <div id={styles.header} className="p-0">
            <div
              className={`${styles['pre-button']} d-flex align-items-center justify-content-center`}
              onClick={prevMonth}
            >
              <i className="fa fa-chevron-left"></i>
            </div>
            <div className={styles['head-info']}>
              <div className={styles['head-day']}>{selectedDate.getDate()}</div>
              <div className={styles['head-month']}>
                {selectedDate.toLocaleString('en-US', {
                  month: 'long',
                })}
                {' - '}
                {selectedDate.toLocaleString('en-US', {
                  year: 'numeric',
                })}
              </div>
            </div>
            <div
              className={`${styles['next-button']} d-flex align-items-center justify-content-center`}
              onClick={nextMonth}
            >
              <i className="fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div className={styles['calendar-wrap']}>
          <table id={styles.calendar}>
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {monthData.map((week, index) => (
                <tr key={index}>
                  {week.map((day, dayIndex) => {
                    const isCurrentMonthDay = day !== ''
                    const isHighlighted = highlightedDates.includes(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        day
                      ).toLocaleDateString('en-GB')
                    )
                    const cellClass = isHighlighted ? styles.toDo : ''
                    const disabledClass = isCurrentMonthDay
                      ? ''
                      : styles.disabled

                    return (
                      <td
                        key={dayIndex}
                        onClick={() => isCurrentMonthDay && selectDate(day)}
                        className={`${
                          isCurrentMonthDay ? cellClass : ''
                        } ${disabledClass}`}
                      >
                        {day}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
