// signin.js

document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    // Get login credentials
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Get registered students
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Check if user exists
    const student = students.find(user =>
        user.email === email && user.password === password
    );

    if (student) {

        // Save logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(student));

        alert("Login Successful!");

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password!");

    }

});