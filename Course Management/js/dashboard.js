// =========================================
// DASHBOARD.JS
// =========================================

// ------------------------------
// CHECK LOGIN
// ------------------------------

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first!");
    window.location.href = "signin.html";
}

// ------------------------------
// DISPLAY STUDENT NAME
// ------------------------------

const studentName = document.getElementById("studentName");

if (studentName) {
    studentName.textContent = loggedInUser.fullName;
}

// ------------------------------
// LOAD DASHBOARD
// ------------------------------

function loadDashboard() {

    // Get latest LocalStorage data

    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    const enrolledCourses =
        JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const progressData =
        JSON.parse(localStorage.getItem("progressData")) || [];

    const certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

    // Current User Data

    const myEnrollments = enrolledCourses.filter(course =>
        course.studentEmail === loggedInUser.email
    );

    const myProgress = progressData.filter(course =>
        course.studentEmail === loggedInUser.email
    );

    const myCertificates = certificates.filter(certificate =>
        certificate.studentEmail === loggedInUser.email
    );

    // Dashboard Cards

    document.getElementById("totalCourses").textContent =
        courses.length;

    document.getElementById("enrolledCourses").textContent =
        myEnrollments.length;

    document.getElementById("completedCourses").textContent =
        myProgress.filter(course =>
            Number(course.progress) === 100
        ).length;

    document.getElementById("certificateCount").textContent =
        myCertificates.length;

    // ------------------------------
    // RECENT COURSES TABLE
    // ------------------------------

    const tableBody =
        document.querySelector(".recent-courses tbody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (myProgress.length === 0) {

        tableBody.innerHTML = `

        <tr>

            <td colspan="4" style="text-align:center;">

                No course progress available.

            </td>

        </tr>

        `;

        return;

    }

    myProgress.slice(0, 5).forEach(course => {

        let status = "Not Started";

        if (Number(course.progress) === 100)
            status = "Completed";

        else if (Number(course.progress) > 0)
            status = "In Progress";

        tableBody.innerHTML += `

        <tr>

            <td>${course.courseName}</td>

            <td>${course.instructor}</td>

            <td>${course.progress}%</td>

            <td>${status}</td>

        </tr>

        `;

    });

}

// ------------------------------
// LOGOUT
// ------------------------------

const logoutBtn = document.querySelector(".logout");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("loggedInUser");

        window.location.href = "signin.html";

    });

}

// ------------------------------

loadDashboard();