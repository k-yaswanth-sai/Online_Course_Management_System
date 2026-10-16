// filter.js

// Get courses from LocalStorage
let courses = JSON.parse(localStorage.getItem("courses")) || [];

const categoryFilter = document.getElementById("categoryFilter");
const courseContainer = document.getElementById("filteredCourses");

// Display Courses
function displayCourses(courseArray) {

    if (!courseContainer) return;

    if (courseArray.length === 0) {
        courseContainer.innerHTML = `
            <h3 style="text-align:center;color:red;">
                No Courses Found
            </h3>
        `;
        return;
    }

    courseContainer.innerHTML = "";

    courseArray.forEach(course => {

        courseContainer.innerHTML += `

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

// Load Categories
function loadCategories() {

    if (!categoryFilter) return;

    // Remove duplicate categories
    let categories = [...new Set(courses.map(course => course.category))];

    categoryFilter.innerHTML = `
        <option value="All">All Categories</option>
    `;

    categories.forEach(category => {

        categoryFilter.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;

    });

}

// Filter Courses
if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const selectedCategory = this.value;

        if (selectedCategory === "All") {

            displayCourses(courses);

        } else {

            let filteredCourses = courses.filter(course =>
                course.category === selectedCategory
            );

            displayCourses(filteredCourses);

        }

    });

}

// Initial Load
loadCategories();
displayCourses(courses);