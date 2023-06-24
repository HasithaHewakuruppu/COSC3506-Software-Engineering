import React, { useState } from 'react'
import styles from '../styles/AddItemForm.module.css'

function AddItemForm({ onAddItem }) {
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [label, setLabel] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    // Create the item object
    const newItem = {
      title,
      duration,
      description,
      label: {
        category,
        name: label,
      },
    }

    // Call the onAddItem callback with the new item
    onAddItem(newItem)

    // Reset form fields
    setTitle('')
    setDuration('')
    setDescription('')
    setCategory('')
    setLabel('')
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <h3 className="text-center">Let's Add Your Task !</h3>
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
                name="name"
                id="name"
                placeholder="Your task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group mb-3">
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
              <label className="col-form-label">Label</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder="Your task label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
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
          <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItemForm
