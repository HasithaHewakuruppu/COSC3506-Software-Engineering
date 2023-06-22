import styles from '../styles/Home.module.css'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl: '/tests/dashboard' })
  }

  const handleDiscordAuth = async () => {
    setIsLoading(true)
    await signIn('discord', { callbackUrl: '/tests/dashboard' })
  }

  const handleGitHubAuth = async () => {
    setIsLoading(true)
    await signIn('github', { callbackUrl: '/tests/dashboard' })
  }

  return (
    <section className="vh-100">
      <div className={`${styles.hcustom} container-fluid`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <h1>Hi Hello, How are you ?</h1>
            <img
              className="img-fluid"
              alt="Sample image"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            ></img>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <h2 className={`${styles.signinStyles} lead fw-bold mb-0 me-3`}>
                {isLoading ? <PulseLoader color="#0d6efd" /> : 'Sign in'}
              </h2>

              <div
                className={`${styles.divider} d-flex align-items-center my-4 `}
              >
                <p className="text-center fw-bold mx-3 mb-0 ">with</p>
              </div>

              <button
                type="button"
                className={`${styles.socialLogin} ${styles.google} btn btn-primary btn-lg form-control form-control-lg`}
                onClick={handleGoogleAuth}
              >
                <i className="fab fa-google me-2"></i>&nbsp;&nbsp;Google
              </button>

              <button
                type="button"
                className={`${styles.socialLogin} ${styles.github} btn btn-primary btn-lg form-control form-control-lg`}
                onClick={handleGitHubAuth}
              >
                <i className="fab fa-github me-2"></i>&nbsp;&nbsp;GitHub
              </button>

              <button
                type="button"
                className={`${styles.socialLogin} ${styles.discord} btn btn-primary btn-lg form-control form-control-lg`}
                onClick={handleDiscordAuth}
              >
                <i className="fab fa-discord me-2"></i>&nbsp;&nbsp;Discord
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
