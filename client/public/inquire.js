document
  .getElementById("inquire-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,

      email: event.target.email.value,

      phone: event.target.phone.value,

      message: event.target.message.value,
    };

    fetch("http://localhost:3001/send-email", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        subject: "Inquiry",

        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        alert("Email sent successfully!");
      })

      .catch((error) => {
        alert("Error sending email: " + error);
      });
  });
