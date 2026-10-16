// =========================================
// PROGRESS.JS
// =========================================

// Logged-in user
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first!");
    window.location.href = "signin.html";
}

// LocalStorage Data
let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
let progressData = JSON.parse(localStorage.getItem("progressData")) || [];
let certificates = JSON.parse(localStorage.getItem("certificates")) || [];

const progressList = document.getElementById("progressList");

// =========================================
// LOAD PROGRESS
// =========================================

function loadProgress() {

    const myCourses = enrolledCourses.filter(course =>
        course.studentEmail === loggedInUser.email
    );

    if (myCourses.length === 0) {

        progressList.innerHTML = `
            <h2 style="text-align:center;color:red;">
                You have not enrolled in any course.
            </h2>
        `;

        return;
    }

    progressList.innerHTML = "";

    myCourses.forEach(course => {

        const progress = Number(course.progress) || 0;

        let status = "Not Started";

        if (progress === 100)
            status = "Completed";
        else if (progress > 0)
            status = "In Progress";

        progressList.innerHTML += `

        <div class="progress-card">

            <h2>${course.courseName}</h2>

            <p><strong>Category:</strong> ${course.category}</p>

            <p><strong>Instructor:</strong> ${course.instructor}</p>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${progress}%;">
                </div>

            </div>

            <h3>${progress}% Completed</h3>

            <p class="status">
                Status : ${status}
            </p>

            ${
                progress < 100
                ?
                `
                <button
                    class="update-btn"
                    onclick="updateProgress(${course.courseId})">

                    Update Progress

                </button>
                `
                :
                `
                <button
                    class="update-btn"
                    disabled>

                    Course Completed

                </button>
                `
            }

        </div>

        `;

    });

}

// =========================================
// UPDATE PROGRESS
// =========================================

// =========================================
// UPDATE PROGRESS
// =========================================

function updateProgress(courseId) {

    // Update enrolledCourses
    enrolledCourses.forEach(course => {

        if (
            course.courseId === courseId &&
            course.studentEmail === loggedInUser.email
        ) {

            if (course.progress < 100) {

                course.progress += 10;

                if (course.progress > 100)
                    course.progress = 100;

                course.status =
                    course.progress === 100
                    ? "Completed"
                    : "In Progress";
            }
        }

    });

    // Update progressData
    progressData.forEach(course => {

        if (
            course.courseId === courseId &&
            course.studentEmail === loggedInUser.email
        ) {

            if (course.progress < 100) {

                course.progress += 10;

                if (course.progress > 100)
                    course.progress = 100;

                course.status =
                    course.progress === 100
                    ? "Completed"
                    : "In Progress";
            }

        }

    });

    // Save updated progress first
    localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(enrolledCourses)
    );

    localStorage.setItem(
        "progressData",
        JSON.stringify(progressData)
    );

    // =========================================
    // CREATE CERTIFICATE
    // =========================================

    const completedCourse = enrolledCourses.find(course =>
        course.courseId === courseId &&
        course.studentEmail === loggedInUser.email &&
        Number(course.progress) === 100
    );

    if (completedCourse) {

        const alreadyExists = certificates.some(c =>
            c.courseId === completedCourse.courseId &&
            c.studentEmail === loggedInUser.email
        );

        if (!alreadyExists) {

            certificates.push({

                certificateId: "CERT-" + Date.now(),

                studentEmail: loggedInUser.email,

                studentName: loggedInUser.fullName,

                courseId: completedCourse.courseId,

                courseName: completedCourse.courseName,

                instructor: completedCourse.instructor,

                completionDate: new Date().toLocaleDateString()

            });

            localStorage.setItem(
                "certificates",
                JSON.stringify(certificates)
            );

            alert(
                "🎉 Congratulations!\n\nCertificate unlocked for " +
                completedCourse.courseName
            );
        }
    }

    loadProgress();

}
    
// =========================================
// LOGOUT
// =========================================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "signin.html";

}

// =========================================

loadProgress();