import React, { useRef, useState } from "react";
import "./forgotPassword.css";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { url } from "../../utils/constants";

export default function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  function handleChange(event) {
    setUserEmail(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(url + "/auth/forgot-password", {
        email: userEmail,
      });

      setSuccess(res.data.message);
    } catch (err) {
      setFailure(err.response.data.message);
    }
  }
  return (
    <>
      <NavbarHome />
      <div className="container-success">
        <form className="form-login" onSubmit={handleSubmit}>
          <br />
          <h2 className="form-title">Forgot Password?</h2>
          <p>
            Enter your email address to receive further instructions to reset
            your password.
          </p>
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
          <div className="input-field" id="input-long">
            <i className="fas fa-envelope"></i>
            <input
              type="emaill"
              name="email"
              placeholder="Email Address"
              value={userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <button className="bton" type="submit" name="button">
            Send Email
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
