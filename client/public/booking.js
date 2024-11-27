document.addEventListener("DOMContentLoaded", function () {
  // Initialize the date picker

  flatpickr("#booking-dates", {
    mode: "range",

    dateFormat: "Y-m-d",
  });

  // Handle form submission

  document
    .getElementById("booking-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = {
        name: event.target.name.value,

        email: event.target.email.value,

        phone: event.target.phone.value,

        bookingType: event.target["booking-type"].value,

        dates: event.target.dates.value,

        message: event.target.message.value,
      };

      fetch("http://localhost:3001/send-email", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subject: "New Booking Request",

          text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBooking Type: ${formData.bookingType}\nDates: ${formData.dates}\nMessage: ${formData.message}`,
        }),
      })
        .then((response) => response.json())

        .then((data) => {
          alert("Booking request sent successfully!");
        })

        .catch((error) => {
          alert("Error sending booking request: " + error);
        });
    });
});
