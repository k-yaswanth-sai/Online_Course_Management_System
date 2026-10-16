// validation.js

// Name Validation
function validateName(name) {
    if (name.trim() === "") {
        alert("Name cannot be empty.");
        return false;
    }

    const namePattern = /^[A-Za-z ]{3,30}$/;

    if (!namePattern.test(name)) {
        alert("Name should contain only letters and be 3-30 characters long.");
        return false;
    }

    return true;
}

// Email Validation
function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter a valid email address.");
        return false;
    }

    return true;
}

// Password Validation
function validatePassword(password) {

    // Minimum 8 characters,
    // one uppercase,
    // one lowercase,
    // one number,
    // one special character

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
        alert(
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        );
        return false;
    }

    return true;
}

// Course Title Validation
function validateCourseTitle(title) {

    if (title.trim() === "") {
        alert("Course title cannot be empty.");
        return false;
    }

    return true;
}

// Instructor Validation
function validateInstructor(instructor) {

    if (instructor.trim() === "") {
        alert("Instructor name cannot be empty.");
        return false;
    }

    return true;
}

// Duration Validation
function validateDuration(duration) {

    if (duration.trim() === "") {
        alert("Duration cannot be empty.");
        return false;
    }

    return true;
}

// Description Validation
function validateDescription(description) {

    if (description.trim().length < 10) {
        alert("Description should be at least 10 characters long.");
        return false;
    }

    return true;
}