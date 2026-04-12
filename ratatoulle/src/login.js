// Load existing users from localStorage
let usersArr = localStorage.getItem('usersArr');

if (usersArr === null) {
  // No users registered yet, initialize empty array
  usersArr = [];
} else {
  // Parse the stored JSON string back into an array
  usersArr = JSON.parse(usersArr);
}


// --- Helper Functions ---

// Show an error message to the user
function showError(msg) {
  const el = document.getElementById('error-message');
  el.textContent = msg;
  el.style.display = 'block';
}

// Hide the error message
function hideError() {
  const el = document.getElementById('error-message');
  el.style.display = 'none';
}

// Find a user by username or email and matching password
function findUser(identifier, password) {
  return usersArr.find(u =>
    (u.username.toLowerCase() === identifier.toLowerCase() ||
     u.email.toLowerCase()    === identifier.toLowerCase()) &&
     u.password === password
  );
}


// --- User Login Form Handler ---

const userForm = document.forms[0]; // first form — "Login as User"

userForm.addEventListener('submit', function (e) {
  // Prevent the page from reloading
  e.preventDefault();

  // Clear any previous error
  hideError();

  // Get input values
  const identifier = document.getElementById('username').value.trim();
  const password   = document.getElementById('password').value;

  // Check that both fields are filled in
  if (!identifier || !password) {
    showError('Please enter your username/email and password.');
    return;
  }

  // Look for a matching user in localStorage
  const matchedUser = findUser(identifier, password);

  if (!matchedUser) {
    // No user found with those credentials
    showError('Incorrect username/email or password. Please try again.');
    return;
  }

  // Check that the matched user is NOT an admin trying to log in as a regular user
  if (matchedUser.isAdmin) {
    showError('Admin accounts must log in using the "Login as Admin" button.');
    return;
  }

  // Save the logged-in user to sessionStorage so other pages can access it
  sessionStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

  // Redirect to the main user page
  window.location.href = 'index.html';
});


// --- Admin Login Form Handler ---

const adminForm = document.forms[1]; // second form — "Login as Admin"

adminForm.addEventListener('submit', function (e) {
  // Prevent the page from reloading
  e.preventDefault();

  // Clear any previous error
  hideError();

  // Get input values (shared fields from the same page)
  const identifier = document.getElementById('username').value.trim();
  const password   = document.getElementById('password').value;

  // Check that both fields are filled in
  if (!identifier || !password) {
    showError('Please enter your username/email and password.');
    return;
  }

  // Look for a matching user in localStorage
  const matchedUser = findUser(identifier, password);

  if (!matchedUser) {
    // No user found with those credentials
    showError('Incorrect username/email or password. Please try again.');
    return;
  }

  // Check that the matched user is actually an admin
  if (!matchedUser.isAdmin) {
    showError('This account does not have admin privileges.');
    return;
  }

  // Save the logged-in admin to sessionStorage so other pages can access it
  sessionStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

  // Redirect to the admin page
  window.location.href = 'index_admin.html';
});
