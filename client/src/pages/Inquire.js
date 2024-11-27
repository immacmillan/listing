import React, { useState } from "react";
import axios from "axios";
import "../style-guide.css";
import "../App.css";

function Inquire() {
  const [formData, setFormData] = useState({
    name: "",

    email: "",

    phone: "",

    reason: "Inquiry",

    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.message) newErrors.message = "Message is required";

    if (formData.message.length > 2500)
      newErrors.message = "Message cannot exceed 2500 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (subject, text) => {
    axios
      .post("http://localhost:3001/send-email", { subject, text })

      .then((response) => {
        alert("Email sent successfully!");
      })

      .catch((error) => {
        alert("Error sending email: " + error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const subject = `Contact Us: ${formData.reason}`;

      const text = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nReason: ${formData.reason}\nMessage: ${formData.message}`;

      sendEmail(subject, text);
    }
  };

  return (
    <div className="App">
      {/* <header>
        <div className="logo">Luxe Listings LLP</div>
      </header> */}

      <div className="hero">
        <nav className="hero-nav">
          <a href="#home">Home</a>
          <a href="#listings">Listings</a>
          <a href="#contact-us">Contact Us</a>
        </nav>
        <div className="hero-content">
          <br></br>
          <h1>Retreat into Refined Denver Living</h1>
          <p>Comfort and Access - Ski, Hike, Explore, or Relax and Unwind</p>
        </div>
      </div>
      <div className="contact-us">
        <h3>Inquire Now</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            maxLength="2500"
            required
          ></textarea>

          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit" className="action-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inquire;
