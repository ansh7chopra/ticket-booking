window.onload = function () {
  // Retrieving the booking information from local storage
  const selectedMovie = localStorage.getItem("selectedMovie");
  const selectedPVR = localStorage.getItem("selectedPVR");
  const selectedShowTime = localStorage.getItem("selectedShowTime");
  const selectedDate = localStorage.getItem("selectedDate");
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // Displaying the booking information on the ticket page
  document.getElementById("movieName").innerText = selectedMovie;
  document.getElementById("pvrName").innerText = selectedPVR;
  document.getElementById("showtime").innerText = selectedShowTime;
  document.getElementById("date").innerText = selectedDate;
  document.getElementById("selectedSeats").innerText = selectedSeats.join(", ");

  // Logging retrieved values to console for verification
  console.log("Booking information retrieved from local storage:");
  console.log("Selected Movie:", selectedMovie);
  console.log("Selected PVR:", selectedPVR);
  console.log("Selected Show Time:", selectedShowTime);
  console.log("Selected Date:", selectedDate);
  console.log("Selected Seats:", selectedSeats);

  // Prepare booking data object
  const bookingData = {
      movie: selectedMovie,
      pvr: selectedPVR,
      showTime: selectedShowTime,
      date: selectedDate,
      seats: selectedSeats
  };

  // Send the booking information to the server using fetch API
  fetch('http://localhost:3000/ticket.html', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Booking data sent to server:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
};
