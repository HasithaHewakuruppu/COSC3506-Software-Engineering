import React, { useState } from 'react'
import useSWR from 'swr'
<<<<<<< HEAD
import DatePicker from 'react-datepicker'
import styles from '../styles/AddItemForm.module.css'
import 'react-datepicker/dist/react-datepicker.css'
=======
import styles from '../styles/AddItemForm.module.css'
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
import SessionUser from '../components/SessionUser'

function AddItemForm() {
  const [title, setTitle] = useState('')
<<<<<<< HEAD
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [description, setDescription] = useState('')
  const [labelId, setLabelId] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
=======
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [labelId, setlabelId] = useState('')
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
  const [isLoading, setIsLoading] = useState(false)

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data: labels, error } = useSWR(
    'http://localhost:3000/api/labels',
    fetcher
  )

  if (error) {
    console.error('Error fetching labels:', error)
  }

<<<<<<< HEAD
=======
  const date = new Date()

>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
  async function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault()

    const sessionUser = await SessionUser()
    const userEmail = sessionUser.email

    const newItem = {
      title,
      duration: hours * 60 + minutes,
      description,
      labelId,
<<<<<<< HEAD
      date: selectedDate,
=======
      date,
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
      userEmail,
    }

    try {
      await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
    } catch (error) {
      alert('Error adding item:', error)
    }

    setIsLoading(false)

    setTitle('')
<<<<<<< HEAD
    setHours('')
    setMinutes('')
    setDescription('')
    setLabelId('')
    setSelectedDate(null)
=======
    setDuration('')
    setDescription('')
    setlabelId('')
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
<<<<<<< HEAD
        <h3 className="text-center">Let's Add Your Task!</h3>
=======
        <h3 className="text-center">Let's Add Your Task !</h3>
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
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
<<<<<<< HEAD
                name="title"
                id="title"
=======
                name="name"
                id="name"
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
                placeholder="Your task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group mb-3">
<<<<<<< HEAD
=======
              <label className="col-form-label">Duration</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Estimated task duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group mb-3">
>>>>>>> 4f28b4455761290812518c1a9af2fdcbafef98c8
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
                    type="text"
                    className="form-control"
                    placeholder="Hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
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
