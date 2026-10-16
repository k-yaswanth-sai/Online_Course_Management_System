// ===============================
// HOME.JS
// ===============================

// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {

    // Get the Get Started button
    const getStartedBtn = document.getElementById("getStartedBtn");

    // Redirect to Sign Up page when clicked
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", () => {
            window.location.href = "signup.html";
        });
    }

});