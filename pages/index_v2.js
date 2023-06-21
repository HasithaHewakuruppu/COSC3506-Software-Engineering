import styles from "../styles/Home.module.css"
import { signIn } from "next-auth/react";

// i stole this off https://mdbootstrap.com/docs/standard/extended/login/  :) 
// We can remove things we dont want later, such as forgot password which is hard to implement...

export default function HomePage() {

  const handleGoogleAuth = () => {
    signIn("google");
  };

  const handleDiscordAuth = () => {
    signIn("discord");
  };

  const handleGitHubAuth = () => {
    signIn("github");
  };
  
  return (
  <section class="vh-100">
    <div className={`${styles.hcustom} container-fluid`}>
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <h1>Hi Hello, How are you ?</h1>
          <img class="img-fluid" alt="Sample image" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"></img>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p className={`${styles.signinStylesV2} lead fw-normal mb-0 me-3`}>Sign in with</p>

              <button type="button" className={`${styles.socialLogin} ${styles.google} btn btn-primary btn-md form-control-sm `} onClick={handleGoogleAuth}>
                    <i class="fab fa-google me-2"></i>&nbsp;&nbsp;Google
                </button>

                <button type="button" className={`${styles.socialLogin} ${styles.github} btn btn-primary btn-md form-control-sm `} onClick={handleGitHubAuth}>
                    <i class="fab fa-github me-2"></i>&nbsp;&nbsp;GitHub
                </button>

                <button type="button" className={`${styles.socialLogin} ${styles.discord} btn btn-primary btn-md form-control-sm `} onClick={handleDiscordAuth}>
                    <i class="fab fa-discord me-2"></i>&nbsp;&nbsp;Discord
                </button>
            </div>

            <div className={`${styles.divider} d-flex align-items-center my-4`}>
              <p class="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

        
            <div class="form-outline mb-4">
              <input type="email" id="form3Example3" class="form-control form-control-lg"
                placeholder="Email address" />
            </div>

          
            <div class="form-outline mb-3">
              <input type="password" id="form3Example4" class="form-control form-control-lg"
                placeholder="Password" />
            </div>

            <div class="d-flex justify-content-between align-items-center">
            
              <div class="form-check mb-0">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                <label class="form-check-label">
                  Remember me
                </label>
              </div>
              <a href="#!" className={`text-body ${styles.noUnderline}`} >Forgot password?</a>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" className={`${styles.login} btn btn-primary btn-lg`}>
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?&nbsp;&nbsp;
            <a href="#!" className={`link-danger ${styles.noUnderline}`}>Register</a></p>
            </div>

          </form>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    
      <div class="text-white mb-3 mb-md-0">
        Copyright © 2020. All rights reserved.
      </div>
    
      <div>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="#!" class="text-white">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      
    </div>
  </section>
  );
}
