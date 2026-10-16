// signup.js

document.getElementById("signupForm").addEventListener("submit", function (e) {

    e.preventDefault();

    // Get input values
    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (fullName === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (phone.length !== 10) {
        alert("Mobile number must be 10 digits.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Get existing students
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Check duplicate email
    const exists = students.find(student => student.email === email);

    if (exists) {
        alert("An account with this email already exists.");
        return;
    }

    // Create new student object
    const student = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        phone: phone,
        password: password
    };

    // Save student
    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Registration Successful!");

    // Clear form
    document.getElementById("signupForm").reset();

    // Redirect to Sign In page
    window.location.href = "signin.html";

});