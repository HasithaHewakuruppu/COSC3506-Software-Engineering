import styles from '../styles/AddItemForm.module.css'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import SessionUser from './SessionUser'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { API_ENDPOINTS } from '../utils/routes'
import useSWR from 'swr'

function EditItemForm({ closeModal, listURL, itemId }) {
  const [title, setTitle] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [description, setDescription] = useState('')
  const [labelId, setLabelId] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useSWRConfig()


  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data: labels, error } = useSWR(API_ENDPOINTS.GET_LABELS, fetcher)
  const { data: todo, error: todoError } = useSWR(API_ENDPOINTS.GET_TODO_BY_ID(itemId), fetcher);


  useEffect(() => {
    if (todo) {
      setTitle(todo.title)
      setHours(Math.floor(todo.duration / (60 * 60 * 1000)))
      setMinutes(Math.floor((todo.duration % (60 * 60 * 1000)) / (60 * 1000)))
      setDescription(todo.description)
      setLabelId(todo.labelId)
      setSelectedDate(new Date(todo.date))
    }
  }, [todo])

  if (error || todoError) {
    console.error('Error fetching labels or todo:', error, todoError)
  }

  async function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault()

    const sessionUser = await SessionUser()
    const userEmail = sessionUser.email

    const updatedItem = {
      title,
      duration: (hours * 60 + minutes) * 60 * 1000, // should be in milliseconds for DB
      description,
      labelId,
      date: selectedDate,
      userEmail,
    }

    try {
      const response = await fetch(API_ENDPOINTS.GET_TODO_BY_ID(todoId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      })

      if (response.ok) {
        toast('Task Updated!', {
          duration: 4000,
        })
        const url = listURL ? listURL : API_ENDPOINTS.GET_TODOS_WITH_LABELS // by default will grab all todos
        mutate(url)
      } else {
        const error = await response.json()
        toast('Sorry, we could not update your task. ' + error.message, {
          duration: 4000,
        })
      }
    } catch (error) {
      toast('Sorry, we could not update your task. ', {
        duration: 4000,
      })
    } finally {
      setIsLoading(false)
    }

    setTitle('')
    setHours('')
    setMinutes('')
    setDescription('')
    setLabelId('')
    setSelectedDate(null)
  }

  return (
    <>
      <style>{`
        .datePicker {
          width: 100%;
          :hover{
            cursor: pointer;
          }
        }
      `}</style>
      <div className={styles.modalContainer}>
        <div className={styles.container}>
          <h3 className="text-center">Let's Edit Your Task!</h3>
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
                    wrapperClassName="datePicker"
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
            <div className="form-group mb-3">
              <label className="col-form-label">Description</label>
              <textarea
                className="form-control"
                name="message"
                id="message"
                placeholder="Your task description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.submitButtonContainer}>
              <button
                type="button"
                onClick={handleSubmit}
                className={`btn ${styles.submitButton}`}
              >
                {isLoading ? 'Updating...' : 'Update Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditItemForm
