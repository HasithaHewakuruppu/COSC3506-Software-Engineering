import React, { useState } from 'react'
import useSWR from 'swr'
import DatePicker from 'react-datepicker'
import styles from '../styles/AddItemForm.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-hot-toast'
import { API_ENDPOINTS } from '../utils/routes'

function FilterItemForm({ closeModal, setListURL }) {
  const [hoursFrom, setHoursFrom] = useState('')
  const [minutesFrom, setMinutesFrom] = useState('')
  const [hoursTo, setHoursTo] = useState('')
  const [minutesTo, setMinutesTo] = useState('')
  const [selectedDateFrom, setSelectedDateFrom] = useState(null)
  const [selectedDateTo, setSelectedDateTo] = useState(null)
  const [labelIds, setLabelIds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data: labels, error } = useSWR(API_ENDPOINTS.GET_LABELS, fetcher)

  if (error) {
    console.error('Error fetching labels:', error)
  }

  async function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault()

    // this is where the url needs to be made and passed to the setListURL function

    const url =
      'http://localhost:3000/api/todos?&from=18-07-2023&labels=true&to=23-07-2023' // this is just a dummu url for now
    setListURL(url)

    closeModal()
  }

  function handleLabelChange(labelId, checked) {
    if (checked) {
      setLabelIds((prevLabelIds) => [...prevLabelIds, labelId])
    } else {
      setLabelIds((prevLabelIds) => prevLabelIds.filter((id) => id !== labelId))
    }
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
          <h3 className="text-center">Filter&apos;s Your Tasks!</h3>
          <form
            className={styles.formContainer}
            id="contactForm"
            name="contactForm"
          >
            <div className="row">
              <div className="col-md-6 form-group mb-3">
                <label className="col-form-label">Date: From</label>
                <div className={`form-control ${styles.datepickerContainer}`}>
                  <DatePicker
                    className={`form-control ${styles.datepicker}`}
                    selected={selectedDateFrom}
                    onChange={(date) => setSelectedDateFrom(date)}
                    placeholderText="Select task date"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="datePicker"
                  />
                </div>
              </div>
              <div className="col-md-6 form-group mb-3">
                <label className="col-form-label">Date: To</label>
                <div className={`form-control ${styles.datepickerContainer}`}>
                  <DatePicker
                    className={`form-control ${styles.datepicker}`}
                    selected={selectedDateTo}
                    onChange={(date) => setSelectedDateTo(date)}
                    placeholderText="Select task date"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="datePicker"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group mb-3">
                <label className="col-form-label">Duration: From</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Hours"
                      value={hoursFrom}
                      onChange={(e) => {
                        const inputValue = e.target.value
                        const hoursValue = parseInt(inputValue)
                        if (hoursValue < 0) {
                          setHoursFrom('')
                        } else {
                          setHoursFrom(hoursValue)
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Minutes"
                      value={minutesFrom}
                      onChange={(e) => {
                        const inputValue = e.target.value
                        const minutesValue = parseInt(inputValue)
                        if (minutesValue < 0 || minutesValue > 59) {
                          setMinutesFrom('')
                        } else {
                          setMinutesFrom(minutesValue)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 form-group mb-3">
                <label className="col-form-label">Duration: To</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Hours"
                      value={hoursTo}
                      onChange={(e) => {
                        const inputValue = e.target.value
                        const hoursValue = parseInt(inputValue)
                        if (hoursValue < 0) {
                          setHoursTo('')
                        } else {
                          setHoursTo(hoursValue)
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Minutes"
                      value={minutesTo}
                      onChange={(e) => {
                        const inputValue = e.target.value
                        const minutesValue = parseInt(inputValue)
                        if (minutesValue < 0 || minutesValue > 59) {
                          setMinutesTo('')
                        } else {
                          setMinutesTo(minutesValue)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-form-label">Labels</label>
              <div className={styles.labelCheckboxContainer}>
                {labels ? (
                  labels.map((label) => (
                    <div key={label.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`labelCheckbox_${label.id}`}
                        value={label.id}
                        checked={labelIds.includes(label.id)}
                        onChange={(e) => {
                          handleLabelChange(label.id, e.target.checked)
                          console.log(labelIds)
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`labelCheckbox_${label.id}`}
                      >
                        {label.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
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
                'Filter Tasks'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterItemForm
