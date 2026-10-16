// localstorage.js

// ===============================
// Generic LocalStorage Functions
// ===============================

// Save data
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get data
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Remove data
function removeData(key) {
    localStorage.removeItem(key);
}

// Clear all LocalStorage
function clearStorage() {
    localStorage.clear();
}

// ===============================
// User Functions
// ===============================

// Save current logged-in user
function saveCurrentUser(user) {
    saveData("currentUser", user);
}

// Get current logged-in user
function getCurrentUser() {
    return getData("currentUser");
}

// Logout user
function logoutUser() {
    removeData("currentUser");
    window.location.href = "signin.html";
}

// ===============================
// Course Functions
// ===============================

// Get all courses
function getCourses() {
    return getData("courses") || [];
}

// Save all courses
function saveCourses(courses) {
    saveData("courses", courses);
}

// Add a new course
function addCourse(course) {
    const courses = getCourses();
    courses.push(course);
    saveCourses(courses);
}

// Delete course
function deleteCourse(index) {
    const courses = getCourses();
    courses.splice(index, 1);
    saveCourses(courses);
}

// Update course
function updateCourse(index, updatedCourse) {
    const courses = getCourses();
    courses[index] = updatedCourse;
    saveCourses(courses);
}

// ===============================
// Enrollment Functions
// ===============================

// Get enrolled courses
function getEnrolledCourses() {
    return getData("enrolledCourses") || [];
}

// Save enrolled courses
function saveEnrolledCourses(courses) {
    saveData("enrolledCourses", courses);
}

// Enroll in course
function enrollCourse(course) {

    const enrolled = getEnrolledCourses();

    const exists = enrolled.some(c => c.title === course.title);

    if (!exists) {
        course.progress = 0;
        enrolled.push(course);
        saveEnrolledCourses(enrolled);
    }
}

// Update course progress
function updateCourseProgress(index, progress) {

    const enrolled = getEnrolledCourses();

    enrolled[index].progress = progress;

    saveEnrolledCourses(enrolled);
}