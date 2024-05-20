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


//  document.addEventListener("DOMContentLoaded", function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const movieId = urlParams.get("id");
//     const selectedPVR = localStorage.getItem("selectedPVR");
//     const selectedShowTime = localStorage.getItem("selectedShowTime");
//     const selectedDate = localStorage.getItem("selectedDate");

//     // Create a unique key for the combination of movieId, PVR, showTime, and date
//     const uniqueKey = `${movieId}_${selectedPVR}_${selectedShowTime}_${selectedDate}`;
//     let seats = document.querySelector(".all-seats");
//     let selectedSeats = JSON.parse(localStorage.getItem(`selectedSeats_${uniqueKey}`)) || [];

//     // Function to generate seats dynamically
//     function generateSeats(availableSeats) {
//         seats.innerHTML = ""; 
//         for (let i = 0; i < availableSeats; i++) {
//             seats.insertAdjacentHTML(
//                 "beforeend",
//                 `<input type="checkbox" name="tickets" id="s${i + 1}" /><label for="s${i + 1}" class="seat available"></label>`
//             );
//         }
//     }

//     // Generate 60 available seats
//     const availableSeats = 60;
//     generateSeats(availableSeats);

//     // Mark the seats that are already selected
//     selectedSeats.forEach(seatId => {
//         const seatCheckbox = document.getElementById(seatId);
//         if (seatCheckbox) {
//             seatCheckbox.checked = true;
//             seatCheckbox.disabled = true; 
//             seatCheckbox.nextElementSibling.classList.remove('available');
//             seatCheckbox.nextElementSibling.classList.add('booked');
//         }
//     });

//     // Add event listeners to the seat checkboxes
//     let tickets = seats.querySelectorAll("input");
//     tickets.forEach((ticket) => {
//         ticket.addEventListener("change", () => {
//             let amount = document.querySelector(".amount").innerHTML;
//             let count = document.querySelector(".count").innerHTML;
//             amount = Number(amount);
//             count = Number(count);

//             if (ticket.checked) {
//                 selectedSeats.push(ticket.id);
//                 count += 1;
//                 amount += 200;
//             } else {
//                 selectedSeats = selectedSeats.filter((seat) => seat !== ticket.id);
//                 count -= 1;
//                 amount -= 200;
//             }
//             document.querySelector(".amount").innerHTML = amount;
//             document.querySelector(".count").innerHTML = count;

//             if (count > 0) {
//                 document.getElementById("paybtn").style.display = "block";
//             } else {
//                 document.getElementById("paybtn").style.display = "none";
//             }

//             // Store the selected seats in localStorage with the unique key
//             localStorage.setItem(`selectedSeats_${uniqueKey}`, JSON.stringify(selectedSeats));
//             console.log("Selected seats:", selectedSeats);
//         });
//     });

//     // Redirect to the payment page on clicking the pay button
//     document.getElementById("paybtn").addEventListener("click", function () {
//         window.location.href = "payment.html";
//     });
//     console.log("Movie ID:", movieId);
//     console.log("Selected PVR:", selectedPVR);
//     console.log("Selected Show Time:", selectedShowTime);
//     console.log("Selected Date:", selectedDate);
//     console.log("Selected Seats:", selectedSeats);
// });
