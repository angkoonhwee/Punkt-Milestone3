import React, { useState } from "react";
import "./contact.css";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { TextareaAutosize } from "@material-ui/core";

export default function Contact() {
  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEnquiry((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <NavbarMain />
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
            <form className="contact-form">
              <FormControl style={{ marginBottom: "12px" }}>
                <InputLabel>Name</InputLabel>
                <Input
                  name="name"
                  value={enquiry.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                  name="email"
                  type="email"
                  value={enquiry.email}
                  onChange={handleChange}
                />
              </FormControl>
              <TextareaAutosize
                className="enquiry-input"
                type="text"
                placeholder="Enter your enquiries..."
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
}
