// ─── TYPEWRITER EFFECT ───────────────────────────────────────────────────────
// This animates the hero subtitle one letter at a time.
// We use setTimeout to call the type() function repeatedly with a 60ms delay
// between each letter, creating the typewriter illusion.

var text = "Wine. Ritual. Feast.";
var i = 0;
var el = document.getElementById("typewriter"); // grab the empty <p> in the hero

function type() {
  if (i < text.length) {
    el.textContent += text[i]; // add one letter to the element
    i++;
    setTimeout(type, 80); // wait 80ms, then call type() again
  }
}

type(); // start the animation when the page loads


// ─── BACK TO TOP BUTTON ──────────────────────────────────────────────────────
// The button is hidden by default (display: none in CSS).
// We listen to the scroll event — when the user scrolls more than 300px,
// we show the button. Clicking it scrolls smoothly back to the top.

var backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  // show button after scrolling 300px, hide it otherwise
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" }); // smooth scroll to top
});


// ─── COLLAPSE TOGGLE TEXT ────────────────────────────────────────────────────
// Bootstrap fires events when a collapse opens or closes.
// We use those events to change the button text between "See more" and "See less".
// querySelectorAll selects ALL collapse buttons at once so we don't repeat code.

document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (btn) {
  var target = document.querySelector(btn.getAttribute("data-bs-target"));

  // Bootstrap fires "show.bs.collapse" just before the panel opens
  target.addEventListener("show.bs.collapse", function () {
    btn.textContent = "See less";
  });

  // Bootstrap fires "hide.bs.collapse" just before the panel closes
  target.addEventListener("hide.bs.collapse", function () {
    btn.textContent = "See more";
  });
});


// ─── RESERVATION FORM VALIDATION ─────────────────────────────────────────────
// When the user clicks "Send Reservation" we validate all fields before submitting.
// If any field is invalid we show a red error message below it.
// Only if everything is valid do we show the confirmation toast and reset the form.

document.getElementById("toastBtn").addEventListener("click", function () {

  // Read the value from each input field
  var name = document.getElementById("guestName").value.trim();
  var email = document.getElementById("guestEmail").value.trim();
  var date = document.getElementById("resDate").value;
  var guests = document.getElementById("guestCount").value;
  var valid = true; // will be set to false if any check fails

  // Clear any error messages from a previous attempt
  document.querySelectorAll(".form-error").forEach(function (el) {
    el.textContent = "";
  });

  // Check 1: name must not be empty
  if (name === "") {
    document.getElementById("nameError").textContent = "Please enter your name.";
    valid = false;
  }

  // Check 2: email must match a basic pattern (something@something.something)
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    valid = false;
  }

  // Check 3: a date must be selected
  if (date === "") {
    document.getElementById("dateError").textContent = "Please select a date.";
    valid = false;
  }

  // Check 4: number of guests must be at least 1
  if (guests === "" || Number(guests) < 1) {
    document.getElementById("guestsError").textContent = "Please enter the number of guests.";
    valid = false;
  }

  // If all checks passed, show the Bootstrap toast and clear the form
  if (valid) {
    var toast = new bootstrap.Toast(document.getElementById("reservationToast"));
    toast.show();
    document.getElementById("reservationForm").reset();
  }
});
