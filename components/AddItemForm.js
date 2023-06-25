import React, { useState } from 'react';
import useSWR from 'swr';
import styles from "../styles/AddItemForm.module.css";
import SessionUser from '../components/SessionUser';

function AddItemForm() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [labelId, setlabelId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: labels, error } = useSWR('http://localhost:3000/api/labels', fetcher);

  if (error) {
    console.error('Error fetching labels:', error);
  }

  const date = new Date();

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    const sessionUser = await SessionUser(); 
    const userEmail = sessionUser.email;

    const newItem = {
      title,
      duration,
      description,
      labelId,
      date,
      userEmail
    };

    try{
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });} catch (error) {
      alert('Error adding item:', error);
    }

    setIsLoading(false);

    setTitle('');
    setDuration('');
    setDescription('');
    setlabelId('');
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <h3 className="text-center">Let's Add Your Task !</h3>
        <form className={styles.formContainer} id="contactForm" name="contactForm">
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="col-form-label">Title</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Your task title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="col-form-label">Duration</label>
              <input type="email" className="form-control" name="email" id="email" placeholder="Estimated task duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group mb-3">
              <label className="col-form-label">Label</label>
              <select
                className="form-control"
                value={labelId}
                onChange={(e) => setlabelId(e.target.value)}
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
            <div className="col-md-12 form-group mb-3">
              <label className="col-form-label">Description</label>
              <textarea className="form-control" name="message" id="message" cols="30" rows="4" placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button className='btn btn-primary btn-lg' onClick={handleSubmit} disabled={isLoading}>
            {isLoading? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemForm;
