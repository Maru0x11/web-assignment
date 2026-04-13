// Load existing users from localStorage, or start with an empty array
let usersArr = localStorage.getItem("usersArr");

if (usersArr === null) {
  // No users saved yet, initialize empty array
  usersArr = [];
} else {
  // Parse the stored JSON string back into an array
  usersArr = JSON.parse(usersArr);
}

// --- Helper Functions ---

// Show an error message to the user
function showError(msg) {
  const el = document.getElementById("error-message");
  el.textContent = msg;
  el.style.display = "block";
}

// Hide the error message
function hideError() {
  const el = document.getElementById("error-message");
  el.style.display = "none";
}

// Check if the email matches a valid format using regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Check if the username is already taken (case-insensitive)
function isDuplicateUsername(username) {
  return usersArr.some(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );
}

// Check if the email is already registered (case-insensitive)
function isDuplicateEmail(email) {
  return usersArr.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

// --- Form Submit Handler ---

document.querySelector("form").addEventListener("submit", function (e) {
  // Prevent the form from reloading the page
  e.preventDefault();

  // Clear any previous error message
  hideError();

  // Get the values from the form fields
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const isAdmin = document.getElementById("admin").checked;

  // --- Input Validation ---

  // Check that username is not empty
  if (!username) {
    showError("Please enter a username.");
    return;
  }

  // Check that email has a valid format
  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  // Check that password is at least 6 characters long
  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  // Check that password and confirm password match
  if (password !== confirm) {
    showError("Passwords do not match.");
    return;
  }

  // Check that the username is not already taken
  if (isDuplicateUsername(username)) {
    showError("That username is already taken. Please choose another.");
    return;
  }

  // Check that the email is not already registered
  if (isDuplicateEmail(email)) {
    showError("An account with that email already exists.");
    return;
  }

  // --- Save the New User ---

  // Build the user object
  const newUser = {
    username,
    email,
    password, // NOTE: plain-text password storage is for demo purposes only
    isAdmin, //NOTE: isAdmin is set to false by default as roles are set by the backend -- keep it like that for now and set to false once we work on the backend
  };

  // Add the new user to the array
  usersArr.push(newUser);

  // Save the updated array back to localStorage
  localStorage.setItem("usersArr", JSON.stringify(usersArr));

  // Redirect to the login page after successful sign up
  window.location.href = "login.html";
});
