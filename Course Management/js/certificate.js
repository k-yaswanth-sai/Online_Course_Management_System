// =====================================
// CERTIFICATE.JS
// =====================================

// Logged-in user
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first!");
    window.location.href = "signin.html";
}

// Get progress data
const progressData =
    JSON.parse(localStorage.getItem("progressData")) || [];

// Container
const certificateList = document.getElementById("certificateList");
const noCertificate = document.getElementById("noCertificate");

// =====================================
// LOAD CERTIFICATES
// =====================================

function loadCertificates() {

    // Only completed courses of logged-in user
    const completedCourses = progressData.filter(course =>
        course.studentEmail === loggedInUser.email &&
        Number(course.progress) === 100
    );

    // No certificates
    if (completedCourses.length === 0) {

        certificateList.innerHTML = "";
        noCertificate.style.display = "block";
        return;
    }

    noCertificate.style.display = "none";

    certificateList.innerHTML = "";

    completedCourses.forEach((course, index) => {

        // Completion Date
        const completionDate = new Date().toLocaleDateString();

        // Certificate ID
        const certificateId =
            "CERT-" +
            new Date().getFullYear() +
            "-" +
            String(index + 1).padStart(3, "0");

        certificateList.innerHTML += `

        <div class="certificate">

            <h1>Certificate of Completion</h1>

            <p class="sub-title">
                This certificate is proudly presented to
            </p>

            <h2>${loggedInUser.fullName}</h2>

            <p>
                for successfully completing the course
            </p>

            <h3>${course.courseName}</h3>

            <p>
                with dedication and outstanding performance.
            </p>

            <div class="details">

                <div>

                    <strong>Completion Date</strong>

                    <p>${completionDate}</p>

                </div>

                <div>

                    <strong>Certificate ID</strong>

                    <p>${certificateId}</p>

                </div>

            </div>

            <div class="signature">

                <div>

                    <hr>

                    <p>${course.instructor}</p>

                </div>

                <div>

                    <hr>

                    <p>CourseHub Director</p>

                </div>

            </div>

            <div style="margin-top:25px; text-align:center;">

                <button
                    class="print-btn"
                    onclick="printCertificate()">

                    <i class="fa-solid fa-print"></i>
                    Print

                </button>

                <button
                    class="download-btn"
                    onclick="downloadCertificate('${course.courseName}')">

                    <i class="fa-solid fa-download"></i>
                    Download

                </button>

            </div>

        </div>

        <br><br>

        `;

    });

}

// =====================================
// PRINT
// =====================================

function printCertificate() {

    window.print();

}

// =====================================
// DOWNLOAD
// =====================================

function downloadCertificate(courseName) {

    const text = `
========================================

        COURSE COMPLETION CERTIFICATE

========================================

Student :
${loggedInUser.fullName}

Course :
${courseName}

Completed Successfully

Date :
${new Date().toLocaleDateString()}

Issued By :
CourseHub

========================================
`;

    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = courseName + "-Certificate.txt";

    link.click();

}

// =====================================

loadCertificates();