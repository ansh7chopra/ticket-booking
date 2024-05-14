function showPaymentDetails() {
  var paymentMethod = document.getElementById("paymentMethod").value;
  var upiDetails = document.getElementById("upiDetails");
  var cardDetails = document.getElementById("cardDetails");

  if (paymentMethod === "upi") {
      upiDetails.style.display = "flex";
      cardDetails.style.display = "none";
  } else if (paymentMethod === "card") {
      upiDetails.style.display = "none";
      cardDetails.style.display = "flex";
  } else {
      upiDetails.style.display = "none";
      cardDetails.style.display = "none";
  }
}


  // Hide payment details initially
  document.addEventListener("DOMContentLoaded", function() {
    var paymentDetails = document.querySelectorAll(".payment-details");
    paymentDetails.forEach(function(element) {
      element.style.display = "none";
    });
  });


// 
function handlePaymentButtonClick() {
    const upiId = document.getElementById("upi-id").value;
    const cardNumber = document.getElementById("card_number").value;
    const cardExpiry = document.getElementById("card_expiry").value;
    const cvv = document.getElementById("cvv").value;

    if (upiId.trim() !== "" || (cardNumber.trim() !== "" && cardExpiry.trim() !== "" && cvv.trim() !== "")) {
        // Redirect to ticket.html page
        window.location.href = "ticket.html";
    } else {
        alert("Please enter payment details.");
    }
}



// Function to check UPI details
function checkUpiDetails() {
  var upiId = document.getElementById("upi-id").value;
  var btnConfirm1 = document.getElementById("btn-confirm1");
  if (upiId.trim() !== "") {
      btnConfirm1.disabled = false;
  } else {
      btnConfirm1.disabled = true;
  }
}

// Function to check card details
function checkCardDetails() {
  var cardNumber = document.getElementById("card_number").value;
  var cardExpiry = document.getElementById("card_expiry").value;
  var cvv = document.getElementById("cvv").value;
  var btnConfirm2 = document.getElementById("btn-confirm2");
  if (cardNumber.trim() !== "" && cardExpiry.trim() !== "" && cvv.trim() !== "") {
      btnConfirm2.disabled = false;
  } else {
      btnConfirm2.disabled = true;
  }
}

// Event listeners for input fields to check details
document.getElementById("upi-id").addEventListener("input", checkUpiDetails);
document.getElementById("card_number").addEventListener("input", checkCardDetails);
document.getElementById("card_expiry").addEventListener("input", checkCardDetails);
document.getElementById("cvv").addEventListener("input", checkCardDetails);

// Event listeners for payment buttons
document.getElementById("btn-confirm1").addEventListener("click", handlePaymentButtonClick);
document.getElementById("btn-confirm2").addEventListener("click", handlePaymentButtonClick);
