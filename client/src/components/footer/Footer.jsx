import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container-fluid foot">
        <div className="footer-flex">
          <Link className="footer-contact" to="/contact">
            Contact Us
          </Link>
          <p>Punkt. {year}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
