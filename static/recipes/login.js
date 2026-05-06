let usersArr = localStorage.getItem('usersArr');
if (usersArr === null) {
  usersArr = [];
} else {
  usersArr = JSON.parse(usersArr);
}

function showError(msg) {
  const el = document.getElementById('error-message');
  el.textContent = msg;
  el.style.display = 'block';
}

function hideError() {
  const el = document.getElementById('error-message');
  el.style.display = 'none';
}

function findUser(identifier, password) {
  return usersArr.find(u =>
    (u.username.toLowerCase() === identifier.toLowerCase() ||
     u.email.toLowerCase()    === identifier.toLowerCase()) &&
     u.password === password
  );
}

document.querySelector('.btn-login').addEventListener('click', function (e) {
  e.preventDefault();
  hideError();

  const identifier = document.getElementById('username').value.trim();
  const password   = document.getElementById('password').value;

  if (!identifier || !password) {
    showError('Please enter your username/email and password.');
    return;
  }

  const matchedUser = findUser(identifier, password);

  if (!matchedUser) {
    showError('Incorrect username/email or password. Please try again.');
    return;
  }

  sessionStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

  if (matchedUser.isAdmin) {
    window.location.href = 'index_admin.html';
  } else {
    window.location.href = 'index.html';
  }
});
