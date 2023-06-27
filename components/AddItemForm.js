import React, { useState } from 'react'
import useSWR from 'swr'
import DatePicker from 'react-datepicker'
import styles from '../styles/AddItemForm.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import SessionUser from '../components/SessionUser'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'

function AddItemForm({ closeModal, apiUrl }) {
  const [title, setTitle] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [description, setDescription] = useState('')
  const [labelId, setLabelId] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useSWRConfig()

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data: labels, error } = useSWR(
    'http://localhost:3000/api/labels',
    fetcher
  )

  if (error) {
    console.error('Error fetching labels:', error)
  }

  async function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault()

    const sessionUser = await SessionUser()
    const userEmail = sessionUser.email

    const newItem = {
      title,
      duration: (hours * 60 + minutes) * 60 * 1000, // should be in miliseconds for DB
      description,
      labelId,
      date: selectedDate,
      userEmail,
    }
    try {
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })

      if (response.ok) {
        toast('Task Added!', {
          duration: 4000,
        })
        mutate(apiUrl)
      } else {
        const error = await response.json()
        toast('Sorry, we could not add your task. ' + error.message, {
          duration: 4000,
        })
      }

      closeModal()
    } catch (error) {
      toast('Sorry, we could not add your task. ', {
        duration: 4000,
      })
    } finally {
      closeModal()
    }

    setIsLoading(false)

    setTitle('')
    setHours('')
    setMinutes('')
    setDescription('')
    setLabelId('')
    setSelectedDate(null)
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <h3 className="text-center">Let's Add Your Task!</h3>
        <form
          className={styles.formContainer}
          id="contactForm"
          name="contactForm"
        >
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="col-form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                placeholder="Your task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="col-form-label">Label</label>
              <select
                className="form-control"
                value={labelId}
                onChange={(e) => setLabelId(e.target.value)}
              >
                <option value="">Select Label</option>
                {labels ? (
                  labels.map((label) => (
                    <option key={label.id} value={label.id}>
                      {label.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="col-form-label">Date</label>
              <div className={`form-control ${styles.datepickerContainer}`}>
                <DatePicker
                  className={`form-control ${styles.datepicker}`}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select task date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="col-form-label">Duration</label>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Hours"
                    value={hours}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      const hoursValue = parseInt(inputValue)
                      if (hoursValue < 0) {
                        setHours('')
                      } else {
                        setHours(hoursValue)
                      }
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Minutes"
                    value={minutes}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      const minutesValue = parseInt(inputValue)
                      if (minutesValue < 0 || minutesValue > 59) {
                        setMinutes('')
                      } else {
                        setMinutes(minutesValue)
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group mb-3">
              <label className="col-form-label">Description</label>
              <textarea
                className="form-control"
                name="message"
                id="message"
                cols="30"
                rows="4"
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItemForm
