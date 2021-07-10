import React, { useRef, useState } from "react";
import "./resetPassword.css";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/constants";
import Alert from "@material-ui/lab/Alert";

export default function ResetPassword() {
  const resetToken = useParams().token;
  const password = useRef();
  const password2 = useRef();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  async function submitReset(event) {
    event.preventDefault();

    const user = {
      password: password.current.value,
      password2: password2.current.value,
    };
    try {
      const res = await axios.post(url + "/auth/reset/" + resetToken, user);
      // history.push("/login");
      setSuccess(res.data.message);
    } catch (err) {
      console.log(err);
      setFailure(err.response.data.message);
    }
  }

  return (
    <>
      <NavbarHome />
      <div class="container-success">
        <form class="form-login" action="/reset/" onSubmit={submitReset}>
          <br />
          <h2 class="form-title">Reset Password</h2>
          {success && (
            <Alert
              severity="success"
              onClose={() => setSuccess(false)}
              style={{ marginTop: "7.5px" }}
            >
              {success}
            </Alert>
          )}

          {failure && (
            <Alert severity="error" onClose={() => setFailure(false)}>
              {failure}
            </Alert>
          )}

          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              ref={password}
            />
          </div>

          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              required
              ref={password2}
            />
          </div>
          <div className="pw-requirements">
            <p>
              Password must be at least 6 characters with at least 1 UPPER case,
              1 lower case and 1 numeric digit.
            </p>
          </div>

          <button class="bton" type="submit" name="button">
            Reset
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
