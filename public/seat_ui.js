document.addEventListener("DOMContentLoaded", function () {
    let seats = document.querySelector(".all-seats");
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    
    function generateSeats(availableSeats) {
        seats.innerHTML = ""; 
        for (let i = 0; i < availableSeats; i++) {
            seats.insertAdjacentHTML(
                "beforeend",
                `<input type="checkbox" name="tickets" id="s${i + 1}" /><label for="s${i + 1}" class="seat available"></label>`
            );
        }
    }
    
    const availableSeats = 60;

    generateSeats(availableSeats);

    selectedSeats.forEach(seatId => {
        const seatCheckbox = document.getElementById(seatId);
        if (seatCheckbox) {
            seatCheckbox.checked = true;
            seatCheckbox.disabled = true;
            seatCheckbox.nextElementSibling.classList.remove('available');
            seatCheckbox.nextElementSibling.classList.add('booked');
        }
    });

    let tickets = seats.querySelectorAll("input");
    tickets.forEach((ticket) => {
        ticket.addEventListener("change", () => {
            let amount = document.querySelector(".amount").innerHTML;
            let count = document.querySelector(".count").innerHTML;
            amount = Number(amount);
            count = Number(count);

            if (ticket.checked) {
                selectedSeats.push(ticket.id);
                count += 1;
                amount += 200;
            } else {
                selectedSeats = selectedSeats.filter((seat) => seat !== ticket.id);
                count -= 1;
                amount -= 200;
            }
            document.querySelector(".amount").innerHTML = amount;
            document.querySelector(".count").innerHTML = count;

            if (count > 0) {
                paybtn.style.display = "block";
            } else {
                paybtn.style.display = "none";
            }

            localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
            console.log("Selected seats:", selectedSeats);
        });
    });

    document.getElementById("paybtn").addEventListener("click", function () {
        window.location.href = "payment.html";
    });
});





// ///////////////////////////////////////////////////////////////////////////////////////////

//  (newly added changes where  each pvr different but seatnumber not displayed  in end )


// document.addEventListener("DOMContentLoaded", function () {
//     const seatsContainer = document.querySelector(".all-seats");
//     let bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
//     let selectedSeats = [];

//     function generateSeats(availableSeats) {
//         seatsContainer.innerHTML = "";
//         for (let i = 0; i < availableSeats; i++) {
//             seatsContainer.insertAdjacentHTML(
//                 "beforeend",
//                 `<input type="checkbox" name="tickets" id="s${i + 1}" /><label for="s${i + 1}" class="seat available"></label>`
//             );
//         }
//     }

//     const availableSeats = 60;
//     generateSeats(availableSeats);

//     const selectedMovie = localStorage.getItem("selectedMovie");
//     const selectedPVR = localStorage.getItem("selectedPVR");
//     const selectedShowTime = localStorage.getItem("selectedShowTime");

//     // Load selected seats for the current movie, PVR, and show time
//     selectedSeats = bookingData[selectedMovie]?.[selectedPVR]?.[selectedShowTime] || [];
//     updateUI(selectedSeats.length);

//     selectedSeats.forEach(seatId => {
//         const seatCheckbox = document.getElementById(seatId);
//         if (seatCheckbox) {
//             seatCheckbox.checked = true;
//             seatCheckbox.disabled = true;
//             seatCheckbox.nextElementSibling.classList.remove('available');
//             seatCheckbox.nextElementSibling.classList.add('booked');
//         }
//     });

//     seatsContainer.addEventListener("change", (event) => {
//         if (event.target.matches('input[type="checkbox"]')) {
//             const seatId = event.target.id;
//             const isChecked = event.target.checked;

//             // Ensure the movie and PVR are selected before booking a seat
//             if (!selectedMovie || !selectedPVR) {
//                 alert("Please select a movie and PVR first.");
//                 event.target.checked = false; // Uncheck the seat
//                 return;
//             }

//             bookingData[selectedMovie] = bookingData[selectedMovie] || {};
//             bookingData[selectedMovie][selectedPVR] = bookingData[selectedMovie][selectedPVR] || {};
//             bookingData[selectedMovie][selectedPVR][selectedShowTime] = bookingData[selectedMovie][selectedPVR][selectedShowTime] || [];

//             if (isChecked) {
//                 bookingData[selectedMovie][selectedPVR][selectedShowTime].push(seatId);
//                 selectedSeats.push(seatId);
//                 console.log('Seat added:', seatId);
//             } else {
//                 const index = bookingData[selectedMovie][selectedPVR][selectedShowTime].indexOf(seatId);
//                 if (index !== -1) {
//                     bookingData[selectedMovie][selectedPVR][selectedShowTime].splice(index, 1);
//                     selectedSeats = selectedSeats.filter(seat => seat !== seatId);
                    
//                 }
//             }

//             localStorage.setItem("bookingData", JSON.stringify(bookingData));
//             updateUI(selectedSeats.length);
//         }
//     });

//     function updateUI(selectedSeatsCount) {
//         const amount = selectedSeatsCount * 200; // Assuming each seat costs 200
//         const countElement = document.querySelector(".count");
//         const amountElement = document.querySelector(".amount");
//         const payButton = document.getElementById("paybtn");

//         countElement.innerHTML = selectedSeatsCount;
//         amountElement.innerHTML = amount;

//         if (selectedSeatsCount > 0) {
//             payButton.style.display = "block";
//         } else {
//             payButton.style.display = "none";
//         }
//     }

//     document.getElementById("paybtn").addEventListener("click", function () {
//         window.location.href = "payment.html";
//     });
// });
