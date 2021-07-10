import React, { useState, useRef, useContext, useEffect } from "react";
import "./loginSignup.css";
import { Link, useHistory } from "react-router-dom";
import { loginCall, signUpCall, googleLoginCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { url } from "../../utils/constants";
import Alert from "@material-ui/lab/Alert";

function LoginSignupForms() {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const { isFetching, dispatch, error } = useContext(UserContext);

  const signupUsername = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const signupPassword2 = useRef();

  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  function submitLogin(event) {
    event.preventDefault();
    loginCall(
      {
        email: loginEmail.current.value,
        password: loginPassword.current.value,
      },
      dispatch
    );

    if (error) {
      setLoginError(error);
    }
  }

  const submitSignup = async (event) => {
    event.preventDefault();

    const user = {
      username: signupUsername.current.value,
      email: signupEmail.current.value,
      password: signupPassword.current.value,
      password2: signupPassword2.current.value,
    };

    signUpCall(user, dispatch);

    if (error) {
      setSignUpError(error);
    }
  };

  return (
    <div className="container-forms">
      <div className="signup-login">
        <form className="form-login" onSubmit={submitLogin}>
          <h2 className="form-title">Login to Punkt.</h2>
          {/* <div className="google-login">
            <div
              className="google-icon"
              style={{ cursor: "pointer" }}
              onClick={googleLogin}
            >
              <i className="fab fa-google"></i> Login with Google
            </div>
          </div>
          <p className="gmail-text">Or use your email account</p> */}
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
          {/* <div className="google-login">
            <div
              className="google-icon"
              style={{ cursor: "pointer" }}
              onClick={googleLogin}
            >
              <i className="fab fa-google"></i> Login with Google
            </div>
          </div>

          <p className="gmail-text">Or use your email for registration</p> */}
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
}

export default LoginSignupForms;
