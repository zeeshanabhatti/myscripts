    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            position: relative;
            height: 100vh; /* Ensure full height for positioning */
            overflow: hidden; /* Hide the scrollbar by default */
            transition: overflow 0.3s; /* Smooth transition */
        }
        .overflow-auto {
            overflow: auto; /* Class to show scrollbar */
        }
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* Ensure it&#39;s on top */
        }
        #login-box {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        h2 {
            text-align: center;
            color: #333;
        }
        input[type=&quot;text&quot;], input[type=&quot;password&quot;] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            transition: border-color 0.3s;
        }
        input[type=&quot;text&quot;]:focus, input[type=&quot;password&quot;]:focus {
            border-color: #007BFF;
            outline: none;
        }
        .login-button, .free-sample-button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .login-button {
            background-color: #28a745;
            color: white;
        }
        .login-button:hover {
            background-color: #218838; /* Darker green for hover */
        }
        .free-sample-button {
            background-color: #007BFF; /* Blue color */
            color: white;
            margin-top: 20px; /* Space from previous button */
        }
        .free-sample-button:hover {
            background-color: #0056b3; /* Darker blue for hover */
        }
        #content {
            display: none; /* Hidden by default */
            text-align: center;
            margin-top: 20px;
        }
        #error-message {
            color: red;
            text-align: center;
        }
        .request-account {
            display: block;
            text-align: center;
            margin-top: 10px;
            color: #007BFF;
            text-decoration: none;
        }
        .request-account:hover {
            text-decoration: underline;
        }
    </style>



<!--COPYING IS DISABLE-->
<script src='demo-to-prevent-copy-paste-on-blogger_files/googleapis.js'/><script type='text/javascript'> if(typeof document.onselectstart!=&quot;undefined&quot; ) {document.onselectstart=new Function (&quot;return false&quot; ); } else{document.onmousedown=new Function (&quot;return false&quot; );document.onmouseup=new Function (&quot;return false&quot;); } </script>

<script type='text/javascript'><!--
// RIGHT CLICK IS DISABLE
///////////////////////////////////
function clickIE4() {
    if (event.button == 2) {
        return false;
    }
}

function clickNS4(e) {
    if (document.layers || document.getElementById && !document.all) {
        if (e.which == 2 || e.which == 3) {
            return false;
        }
    }
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS4;
} else if (document.all && !document.getElementById) {
    document.onmousedown = clickIE4;
}

document.oncontextmenu = function() {
    return false;
};
--></script>
    
<!--DISABLE DEVELOPERS TOOLS--> 
<script disable-devtool-auto='' src='https://cdn.jsdelivr.net/npm/disable-devtool'/>

<script>
  // REFRESH PAGE AFTER 3 HOURS
setInterval(function() {
    location.reload();
}, 10800000); // 10800000 milliseconds = 3 hours
</script>
 
<div id='overlay'>
    <div id='login-box'>
        <h2>Login</h2>
        <input autocomplete='off' id='username' placeholder='Username' type='text'/>
        <input autocomplete='off' id='password' placeholder='Password' type='password'/>
        <button class='login-button' onclick='login()'>Login</button>
        <p id='error-message'/>
        <a class='request-account' href='https://www.computercourse.pk/p/account.html' target='_blank'>Create/Renew an account</a>
        <button class='free-sample-button' onclick='window.location.href=&quot;https://www.computercourse.pk/p/sample.html&quot;'>Free Sample</button>
    </div>
</div>
    
<script type='text/javascript'><!--
// Array of pages to exclude from authentication
const excludedPages = [
    "https://www.computercourse.pk/p/alert.html?m=1",
    "https://www.computercourse.pk/p/alert.html",
    "https://www.computercourse.pk/p/download.html?m=1",
    "https://www.computercourse.pk/p/download.html",
    "https://www.computercourse.pk/p/contact.html?m=1",
    "https://www.computercourse.pk/p/contact.html",
    "https://www.computercourse.pk/p/sample.html?m=1",
    "https://www.computercourse.pk/p/sample.html",
    "https://www.computercourse.pk/p/account.html?m=1",
    "https://www.computercourse.pk/p/account.html",
    "https://www.computercourse.pk/?m=1",
    "https://www.computercourse.pk/"
];

const currentUrl = window.location.href;

// Check if the current page is in the excluded pages
if (excludedPages.includes(currentUrl)) {
    // Hide the overlay and show the content if on an excluded page
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.body.classList.add('overflow-auto'); // Show scrollbar
}

// Array to hold multiple usernames, passwords, and expiry dates ('YY-MM-DD')
const users = [
    { username: 'guest', password: '1234', expiry: new Date('2099-12-31') },
    { username: 'user1', password: 'pass1', expiry: new Date('2024-12-31') },
    { username: 'user2', password: 'pass2', expiry: new Date('2024-10-01') },
    { username: 'user3', password: 'pass3', expiry: new Date('2023-01-01') }
];

// Function to get user by username from the users array
function getUser(username) {
    return users.find(user => user.username === username);
}

// Function to check if the user is expired
function isUserExpired(user) {
    const currentDate = new Date();
    return currentDate > user.expiry;
}

// Load saved credentials if available
window.onload = function() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
    if (savedPassword) {
        document.getElementById('password').value = savedPassword;
    }
    
    // Check if credentials are expired
    if (savedUsername && savedPassword) {
        const user = getUser(savedUsername);
        if (user && isUserExpired(user)) {
            logout(); // Log out if user is expired
        }
    }
};

// Check local storage for authentication status
if (localStorage.getItem('authenticated') === 'true') {
    const savedUsername = localStorage.getItem('username');
    const user = getUser(savedUsername);
    if (user && isUserExpired(user)) {
        logout(); // Log out if user is expired
    } else {
        showProtectedContent();
    }
}

// Function to handle the login process
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error message
    errorMessage.textContent = '';

    // Check if the username and password match any in the users array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Check if the account has expired
        const currentDate = new Date();
        if (currentDate > user.expiry) {
            errorMessage.textContent = 'Your account has expired.';
        } else {
            localStorage.setItem('authenticated', 'true'); // Store authentication status
            
            // Save credentials to local storage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            showProtectedContent(); // Show protected content
        }
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

// Function to show protected content
function showProtectedContent() {
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
    document.getElementById('content').style.display = 'block'; // Show protected content
    document.body.classList.add('overflow-auto'); // Show scrollbar
}

// Function to handle logout
function logout() {
    window.scrollTo(0, 0); // Scroll to the top of the page
    localStorage.removeItem('authenticated'); // Remove authentication status
    document.getElementById('overlay').style.display = 'flex'; // Show the overlay again
    document.getElementById('content').style.display = 'none'; // Hide protected content

    // Clear input fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Clear the inputs from localStorage/sessionStorage to prevent them from being refilled
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');

    // Clear error message
    document.getElementById('error-message').textContent = '';
    
    document.body.classList.remove('overflow-auto'); // Hide scrollbar again
}

// Add event listener for logout button
document.getElementById('logout-button').addEventListener('click', logout);

// Event listener for Enter key
document.getElementById('login-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        login(); // Call login function when Enter is pressed
    }
});
</script>
