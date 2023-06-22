import styles from '../../styles/Home.module.css'
import { signIn } from 'next-auth/react'

// i stole this off https://mdbootstrap.com/docs/standard/extended/login/  :)
// We can remove things we dont want later, such as forgot password which is hard to implement...

export default function HomePage() {
  const handleGoogleAuth = () => {
    signIn('google')
  }

  const handleDiscordAuth = () => {
    signIn('discord')
  }

  const handleGitHubAuth = () => {
    signIn('github')
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
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p
                  className={`${styles.signinStylesV2} lead fw-normal mb-0 me-3`}
                >
                  Sign in with
                </p>

                <button
                  type="button"
                  className={`${styles.socialLogin} ${styles.google} btn btn-primary btn-md form-control-sm `}
                  onClick={handleGoogleAuth}
                >
                  <i className="fab fa-google me-2"></i>&nbsp;&nbsp;Google
                </button>

                <button
                  type="button"
                  className={`${styles.socialLogin} ${styles.github} btn btn-primary btn-md form-control-sm `}
                  onClick={handleGitHubAuth}
                >
                  <i className="fab fa-github me-2"></i>&nbsp;&nbsp;GitHub
                </button>

                <button
                  type="button"
                  className={`${styles.socialLogin} ${styles.discord} btn btn-primary btn-md form-control-sm `}
                  onClick={handleDiscordAuth}
                >
                  <i className="fab fa-discord me-2"></i>&nbsp;&nbsp;Discord
                </button>
              </div>

              <div
                className={`${styles.divider} d-flex align-items-center my-4`}
              >
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Email address"
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label">Remember me</label>
                </div>
                <a href="#!" className={`text-body ${styles.noUnderline}`}>
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className={`${styles.login} btn btn-primary btn-lg`}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don&apos;t have an account?&nbsp;&nbsp;
                  <a href="#!" className={`link-danger ${styles.noUnderline}`}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
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
