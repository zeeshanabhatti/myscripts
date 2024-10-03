
// Create an array to store user objects with usernames, passwords, and expiry dates
var users = [
  { username: 'user1', password: '123123', expiryDate: new Date(2023, 2, 25) },
  { username: 'zeeshan', password: 'unlockit', expiryDate: new Date(2024, 12, 30) },
  { username: 'sonia', password: 'opennow', expiryDate: new Date(2024, 12, 30) },
  { username: 'student', password: '2024', expiryDate: new Date(2024, 12, 30) },
  { username: 'guest', password: '1234', expiryDate: new Date(2099, 12, 30) }
];

var excludedPages = [
  'https://zeepaktech.blogspot.com/',
  'https://zeepaktech.blogspot.com/?m=1',
  'https://zeepaktech.blogspot.com/p/alert.html',
  'https://zeepaktech.blogspot.com/p/alert.html/?m=1'
  'https://zeepaktech.blogspot.com/p/download.html',
  'https://zeepaktech.blogspot.com/p/download.html/?m=1'
];

if (!excludedPages.includes(window.location.href)) {
  // Check if the username and password are stored in cookies
  var un = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var pd = document.cookie.replace(/(?:(?:^|.*;\s*)password\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (!un || !pd) {
    un = prompt('Enter your User Name:', '');
    pd = prompt('Enter your Password:', '');

    // Check if the entered username and password match any of the allowed users
    if (!users.some(user => user.username === un && user.password === pd)) {
      location.href = 'https://zeepaktech.blogspot.com'; // Redirect if not found
    } else {
      // Check if the password has expired for the entered username
      if (users.find(user => user.username === un).expiryDate <= new Date()) {
        alert('Your account has been expired. Please, renew your User Name and Password.');
        location.href = 'zeepaktech.blogspot.com'; // Redirect if expired
      } else {
        // Store the username and password in cookies
        document.cookie = "username=" + un;
        document.cookie = "password=" + pd;
      }
    }
  }
}

