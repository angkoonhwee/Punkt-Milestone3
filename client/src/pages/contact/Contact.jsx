import React, { useState } from "react";
import "./contact.css";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { url } from "../../utils/constants";
import Alert from "@material-ui/lab/Alert";

import { connect } from "react-redux";

function Contact({ user }) {
  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setEnquiry((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(url + "/contact/enquiry", enquiry);
      setSuccess(res.data);
      setEnquiry({ name: "", email: "", content: "" });
    } catch (err) {
      console.log(err);
      setFailure(true);
    }
  }

  return (
    <div>
      {user ? <NavbarMain /> : <NavbarHome />}
      <div className="container-contact">
        <div className="contact-wrapper">
          <div className="container-contact-pic">
            <img src="/assets/img/contact.svg" alt="contact-img" />
          </div>
          <div className="container-contact-form">
            <h2>Contact Us</h2>
            <p className="form-content-text">Send us your enquiries.</p>
            <p className="form-content-text">
              We will get back to you in 3 - 5 working days. 🤗🤗
            </p>

            {success && (
              <Alert
                severity="success"
                onClose={() => setSuccess(false)}
                style={{ marginTop: "7.5px" }}
              >
                Your enquiry has been sent successfully!
              </Alert>
            )}

            {failure && (
              <Alert severity="error" onClose={() => setFailure(false)}>
                Something went wrong!
              </Alert>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <FormControl style={{ marginBottom: "12px" }}>
                <InputLabel>Name</InputLabel>
                <Input
                  name="name"
                  value={enquiry.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                  name="email"
                  type="email"
                  value={enquiry.email}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <TextareaAutosize
                className="enquiry-input"
                name="content"
                value={enquiry.content}
                onChange={handleChange}
                type="text"
                placeholder="Enter your enquiries..."
                required
              />
              <button className="submit-enquiry-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Contact);
