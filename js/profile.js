// ==========================================
// PROFILE.JS
// ==========================================

// ------------------------------
// CHECK LOGIN
// ------------------------------

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first!");
    window.location.href = "signin.html";
}

// ------------------------------
// FORM ELEMENTS
// ------------------------------

const profileForm = document.getElementById("profileForm");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const mobile = document.getElementById("mobile");
const college = document.getElementById("college");
const branch = document.getElementById("branch");
const year = document.getElementById("year");
const password = document.getElementById("password");

// Stats

const totalCourses = document.getElementById("totalCourses");
const enrolledCourses = document.getElementById("enrolledCourses");
const completedCourses = document.getElementById("completedCourses");

// ------------------------------
// LOAD PROFILE
// ------------------------------

function loadProfile() {

    if (!loggedInUser) return;

    userName.value = loggedInUser.fullName || "";
    userEmail.value = loggedInUser.email || "";
    mobile.value = loggedInUser.phone || loggedInUser.mobile || "";
    college.value = loggedInUser.college || "";
    branch.value = loggedInUser.branch || "";
    year.value = loggedInUser.year || "3rd Year";

}

// ------------------------------
// LOAD STATS
// ------------------------------

function loadStats() {

    const courses =
        JSON.parse(localStorage.getItem("courses")) || [];

    const enrollments =
        JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const progress =
        JSON.parse(localStorage.getItem("progressData")) || [];

    // Total available courses

    totalCourses.textContent = courses.length;

    // Current student's enrolled courses

    const myEnrollments = enrollments.filter(course =>
        course.studentEmail === loggedInUser.email
    );

    enrolledCourses.textContent = myEnrollments.length;

    // Completed courses

    const completed = progress.filter(course =>
        course.studentEmail === loggedInUser.email &&
        Number(course.progress) === 100
    );

    completedCourses.textContent = completed.length;

}

// ------------------------------
// SAVE PROFILE
// ------------------------------

if (profileForm) {

    profileForm.addEventListener("submit", function (e) {

        e.preventDefault();

        loggedInUser.fullName = userName.value.trim();
        loggedInUser.phone = mobile.value.trim();
        loggedInUser.college = college.value.trim();
        loggedInUser.branch = branch.value.trim();
        loggedInUser.year = year.value;

        if (password.value.trim() !== "") {
            loggedInUser.password = password.value.trim();
        }

        // Update logged-in user

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        // Update students list

        let students =
            JSON.parse(localStorage.getItem("students")) || [];

        students = students.map(student => {

            if (student.email === loggedInUser.email) {

                student.fullName = loggedInUser.fullName;
                student.phone = loggedInUser.phone;
                student.college = loggedInUser.college;
                student.branch = loggedInUser.branch;
                student.year = loggedInUser.year;

                if (loggedInUser.password) {
                    student.password = loggedInUser.password;
                }

            }

            return student;

        });

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        alert("Profile updated successfully!");

    });

}

// ------------------------------
// LOGOUT
// ------------------------------

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("loggedInUser");

        window.location.href = "signin.html";

    });

}

// ------------------------------
// INITIAL LOAD
// ------------------------------

loadProfile();
loadStats();