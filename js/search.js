// search.js

// Get courses from LocalStorage
let courses = JSON.parse(localStorage.getItem("courses")) || [];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Display Courses
function displayCourses(courseArray) {

    if (!searchResults) return;

    if (courseArray.length === 0) {

        searchResults.innerHTML = `
            <h3 style="text-align:center;color:red;">
                No Courses Found
            </h3>
        `;
        return;
    }

    searchResults.innerHTML = "";

    courseArray.forEach(course => {

        searchResults.innerHTML += `

            <div class="course-card">

                <h2>${course.title}</h2>

                <p><strong>Instructor:</strong> ${course.instructor}</p>

                <p><strong>Category:</strong> ${course.category}</p>

                <p><strong>Duration:</strong> ${course.duration}</p>

                <p>${course.description}</p>

            </div>

        `;

    });

}

// Search Function
if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.trim().toLowerCase();

        if (keyword === "") {

            displayCourses(courses);
            return;

        }

        const filteredCourses = courses.filter(course =>

            course.title.toLowerCase().includes(keyword) ||

            course.instructor.toLowerCase().includes(keyword) ||

            course.category.toLowerCase().includes(keyword)

        );

        displayCourses(filteredCourses);

    });

}

// Initial Load
displayCourses(courses);