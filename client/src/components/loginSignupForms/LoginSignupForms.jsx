import React, { useState, useRef, useEffect } from "react";
import "./loginSignup.css";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { login, signup, signupStart } from "../../redux/actions/auth";

function LoginSignupForms({ login, signup, isFetching, errorLogin, errorSignup }) {
  const loginEmail = useRef();
  const loginPassword = useRef();

  const signupUsername = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const signupPassword2 = useRef();

  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);


  useEffect(() => {
    if(errorLogin) {
      setLoginError(errorLogin);
    } else if (errorSignup) {
      setSignUpError(errorSignup);
    }
  }, [errorSignup, errorLogin]);

  function submitLogin(event) {
    event.preventDefault();
    login({
      email: loginEmail.current.value,
      password: loginPassword.current.value
    });

  }


  const submitSignup = async (event) => {
    event.preventDefault();
      signupStart();
      const user = {
        username: signupUsername.current.value,
        email: signupEmail.current.value,
        password: signupPassword.current.value,
        password2: signupPassword2.current.value,
      };

      signup(user);
  };


  return (
    <div className="container-forms">
      <div className="signup-login">
        <form className="form-login" onSubmit={submitLogin}>
          <h2 className="form-title">Login to Punkt.</h2>
         
          {loginError && (
            <Alert
              severity="error"
              onClose={() => setLoginError(false)}
              stlye={{ maxWidth: "400px", width: "100%" }}
            >
              {loginError}
            </Alert>
          )}
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              // value={loginInfo.email}
              placeholder="Email Address"
              // onChange={handleLoginChange}
              ref={loginEmail}
              required
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              minLength="6"
              // value={loginInfo.password}
              placeholder="Password"
              // onChange={handleLoginChange}
              ref={loginPassword}
              required
            />
          </div>

          <Link className="forgot-pw" to="/forgot-password">
            Forgot your password?
          </Link>
          <button
            className="bton"
            type="submit"
            name="button"
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress id="progress-icon" size="20px" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <form className="form-signup" onSubmit={submitSignup}>
          <h2 className="form-title">Create Account</h2>
          
          {signUpError && (
            <Alert severity="error" onClose={() => setSignUpError(false)}>
              {signUpError}
            </Alert>
          )}

          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              // value={signupInfo.username}
              placeholder="Username"
              // onChange={handleSignupChange}
              required
              ref={signupUsername}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="emaill"
              name="email"
              // value={signupInfo.email}
              placeholder="Email Address"
              // onChange={handleSignupChange}
              required
              ref={signupEmail}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              minLength="6"
              // value={signupInfo.password}
              placeholder="Password"
              // onChange={handleSignupChange}
              required
              ref={signupPassword}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password2"
              minLength="6"
              // value={signupInfo.password2}
              placeholder="Confirm Password"
              // onChange={handleSignupChange}
              required
              ref={signupPassword2}
            />
          </div>

          <div className="pw-requirements">
            <p>
              Password must be at least 6 characters with at least 1 UPPER case,
              1 lower case and 1 numeric digit.
            </p>
          </div>

          <button
            className="bton"
            type="submit"
            name="button"
            disabled={isFetching}
          >
            {isFetching ? <CircularProgress size="20px" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.auth.isFetching,
    errorLogin: state.auth.errorLogin,
    errorSignup: state.auth.errorSignup
  };
}

export default connect(mapStateToProps, { login, signup, signupStart })(LoginSignupForms);
