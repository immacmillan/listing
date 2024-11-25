import React, { useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./style-guide.css";

import "./App.css";

function App() {
  const listings = [
    {
      id: 1,
      title:
        "Cozy Formal Living Room with Gas Fireplace, Board games, Oriental rugs, and local/foreign art.",
      image: `${process.env.PUBLIC_URL}/assets/pic1.jpg`,
    },

    {
      id: 2,
      title:
        "Look out at the water, mature trees, and golf greens as you use your built-in, gas stovetop.",
      image: `${process.env.PUBLIC_URL}/assets/pic2.jpg`,
    },

    {
      id: 3,
      title:
        "Full Gourmet Kitchen with Lake Views, Double Oven, Walk-in Pantry, Dishwasher, and much more.",
      image: `${process.env.PUBLIC_URL}/assets/pic3.jpg`,
    },
    {
      id: 4,
      title:
        "Large Glass Dining Table with a View, generously sized to accommodate 10",
      image: `${process.env.PUBLIC_URL}/assets/pic4.jpg`,
    },
    {
      id: 5,
      title:
        "High-End Joola Ping Pong Table - set of balls, paddles, and serving Robot.",
      image: `${process.env.PUBLIC_URL}/assets/pic5.jpg`,
    },
    {
      id: 6,
      title:
        "From Second Floor Landing, looking out on the Pond, Course & Side Yard view",
      image: `${process.env.PUBLIC_URL}/assets/pic6.jpg`,
    },
    {
      id: 7,
      title:
        "From the loft, you can see a Peregrpine Falcon perched on a gorgeous fall morning",
      image: `${process.env.PUBLIC_URL}/assets/pic7.jpg`,
    },
    {
      id: 8,
      title:
        "From the kitchen, you can see the backyard and pond after recent snowfall",
      image: `${process.env.PUBLIC_URL}/assets/pic8.jpg`,
    },
    {
      id: 9,
      title:
        "State of the Art, Spa-like bathroom - Rainfall shower, Smart Mirror & Toilet",
      image: `${process.env.PUBLIC_URL}/assets/pic9.jpg`,
    },
    {
      id: 10,
      title:
        "Gaming & Exercise Room - UV Sauna, Foosball, Airhockey, Workout Equipment.",
      image: `${process.env.PUBLIC_URL}/assets/pic10.jpg`,
    },
  ];

  const otherListings = [
    {
      id: 11,
      title:
        "4500 Sqft, 6 Bedroom, 3 Bathrooms",
      image: `${process.env.PUBLIC_URL}/assets/pic11.jpg`,
    },
    { id: 12, title: "Charming Cottage", image: `${process.env.PUBLIC_URL}/assets/pic11.jpg`, },

    { id: 13, title: "Urban Loft", link: "#urban-loft" },
  ];
  const amenities = [
    { icon: "fa-hot-tub", label: "Jacuzzi Tub" },

    { icon: "fa-shower", label: "Rainfall Shower" },

    { icon: "fa-tv", label: "Multimedia Center" },

    { icon: "fa-table-tennis", label: "Ping Pong" },

    { icon: "fa-fire", label: "2 Gas Fireplaces" },

    { icon: "fa-umbrella-beach", label: "Balcony" },

    { icon: "fa-gamepad", label: "Gaming Friendly" },

    { icon: "fa-laptop", label: "Standing Desks" },

    { icon: "fa-bed", label: "Tempurpedic Mattresses" },

    { icon: "fa-burger", label: "BBQ Smoker & Grill" },

    { icon: "fa-water", label: "Lake View" },

    { icon: "fa-mountain", label: "Mountain View" },
    { icon: "fa-futbol", label: "Foosball Table" },
    { icon: "fa-hockey-puck", label: "Air Hockey Table" },
    { icon: "fa-heart-pulse", label: "UV Cedar Sauna" },
  ];

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    phone: "",

    reason: "",

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
      <header>
        <div className="logo">Luxe Listings LLP</div>

        <nav>
          <a href="#home">Home</a>

          <a href="#listings">Listings</a>

          <a href="#contact">Contact Us</a>
        </nav>
      </header>

      <div className="hero">
        <div className="hero-content">
          <br></br>
          <h1>Retreat into Refined Denver Living</h1>

          <p>Comfort and Access - Ski, Hike, Explore, or Relax and Unwind</p>
        </div>
      </div>

      <div className="carousel-container">
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          stopOnHover
          emulateTouch
          swipeable
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          dynamicHeight={false}
          transitionTime={800}
          axis="horizontal"
        >
          {listings.map((listing) => (
            <div key={listing.id}>
              <img src={listing.image} alt={listing.title} />

              <p className="legend">{listing.title}</p>
            </div>
          ))}
        </Carousel>

        <div className="action-buttons">
          <button
            className="action-button"
            onClick={() =>
              sendEmail("Inquiry", "I am interested in this property.")
            }
          >
            Inquire Now
          </button>
          <button
            className="action-button"
            onClick={() =>
              sendEmail(
                "Booking Request",
                "I would like to book this property."
              )
            }
          >
            New Booking / Event
          </button>

          {/*  <a href="#inquire" className="action-button">
            Inquire Now
          </a>

          <a href="#booking" className="action-button">
            Request Booking
          </a> */}
        </div>
      </div>

      <div className="property-details">
        <h2>5236 Malta Street, Denver CO, 80249</h2>

        <div className="price">Inquire for Pricing - Daily/Weekly/Monthly</div>

        <div className="features">
          <div>7 Bedrooms</div>

          <div>4 Full Baths</div>

          <div>6,000+ sqft</div>
        </div>

        <div className="description">
          Welcome to the best kept secret in Green Valley Ranch - comfortable,
          spacious, and ample privacy at 5236 Malta, with lake views spanning
          kitchen and living room, and into the primary bedroom & balcony -
          Available fully furnished, you can take in the Rocky Mountains from
          upstairs, or try out the UV Sauna & Spa-like downstairs bath.
          Something for everyone, with gaming, multimedia, cozy nooks, jacuzzi
          tub, and high-end finishes abundant. This gorgeous, Denver home is
          well suited for families or groups (private or business) who
          appreciate refined amenities and well-appointed living. <br></br>
          <br></br>
          <strong>
            <u>Available for events on request!</u>
          </strong>
          <br></br>
          <br></br>
          Guests at Denver Dream House will be able to enjoy activities in and
          around Denver, like Skiing the Rockies, Hiking at the nearby Rocky
          Mountain Arsenal National Wildlife Refuge 3 mi away, or Golfing at
          Green Valley Ranch Greens (on-site). Gaylord Convention Center is 1.5
          mi - 5 min drive - from the accommodation, and Denver International
          Airport (DIA / DEN), 4.3 mi -15 min drive - from the home.
        </div>
      </div>

      <div className="amenities">
        <h3>Amenities</h3>

        <div className="amenities-list">
          {amenities.map((amenity, index) => (
            <div className="amenity" key={index}>
              <i className={`fas ${amenity.icon}`}></i>

              <span>{amenity.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="other-listings">
        <h3>Other Listings</h3>

        {otherListings.map((listing) => (
          <div className="listing" key={listing.id}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/${listing.id}.jpg`}
              alt={listing.title}
            />

            <div className="listing-content">
              <a href={listing.link} className="listing-link">
                {listing.title}
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <div className="contact-us">
          <h3>Contact Us</h3>

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

            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            >
              <option value="">Choose one</option>

              <option value="Short-term Rental">Short-term Rental</option>

              <option value="Mid-term Rental">Mid-term Rental</option>

              <option value="Long-term Rental">Long-term Rental</option>

              <option value="Corporate/Private Event">
                Corporate/Private Event
              </option>

              <option value="Other">Other</option>
            </select>

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
        <br></br>© 2025 Luxe Listings LLP - All rights reserved.
        <br></br>
        <br></br>
        <a href="#privacy">Privacy Policy</a> |{" "}
        <a href="#terms">Terms of Service</a>
        <br></br>
        <br></br>
      </footer>
    </div>
  );
}

export default App;
