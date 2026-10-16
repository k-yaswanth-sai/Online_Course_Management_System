// ===============================
// course.js
// ===============================


// Get courses from LocalStorage

let courses = JSON.parse(localStorage.getItem("courses"));


if(!courses || courses.length === 0){


    courses = [

        {
            id:1,
            title:"Java Programming",
            category:"Programming",
            instructor:"John Smith",
            duration:"8 Weeks",
            description:
            "Learn Core Java, OOP concepts, Collections, Exception Handling and JDBC.",
            image:"images/java.jpg"
        },


        {
            id:2,
            title:"HTML & CSS",
            category:"Web Development",
            instructor:"Sarah Johnson",
            duration:"6 Weeks",
            description:
            "Build responsive websites using HTML5 and CSS3.",
            image:"images/htmlcss.jpg"
        },


        {
            id:3,
            title:"JavaScript",
            category:"Web Development",
            instructor:"David Brown",
            duration:"7 Weeks",
            description:
            "Master JavaScript ES6, DOM manipulation and APIs.",
            image:"images/javascript.jpg"
        },


        {
            id:4,
            title:"MySQL Database",
            category:"Database",
            instructor:"Emily Davis",
            duration:"5 Weeks",
            description:
            "Learn SQL queries, joins and database design.",
            image:"images/mysql.jpg"
        },


        {
            id:5,
            title:"AWS Cloud Basics",
            category:"Cloud",
            instructor:"Michael Lee",
            duration:"6 Weeks",
            description:
            "Learn EC2, S3, IAM and cloud deployment.",
            image:"images/cloud.jpg"
        },


        {
            id:6,
            title:"Cyber Security",
            category:"Cyber Security",
            instructor:"Robert Wilson",
            duration:"8 Weeks",
            description:
            "Learn ethical hacking, network security and penetration testing.",
            image:"images/cybersecurity.jpg"
        }

    ];


    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

}


// Elements

const courseContainer =
document.getElementById("courseContainer");


const searchInput =
document.getElementById("searchCourse");




// ===============================
// CHECK LOGIN
// ===============================


const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));




// ===============================
// DISPLAY COURSES
// ===============================


function displayCourses(data = courses){


    if(!courseContainer)
        return;



    if(data.length === 0){


        courseContainer.innerHTML = `

        <h3 style="text-align:center;color:red;">
            No Courses Available
        </h3>

        `;


        return;

    }



    courseContainer.innerHTML = "";




    data.forEach((course,index)=>{


        courseContainer.innerHTML += `


        <div class="course-card">


            <img src="${course.image || 'images/default.jpg'}">


            <h3>
                ${course.title}
            </h3>



            <p>
                ${course.description}
            </p>



            <span class="category">

                ${course.category}

            </span>



            <div class="course-info">


                <span>
                👨‍🏫 ${course.instructor}
                </span>


                <span>
                ${course.duration}
                </span>


            </div>





            <button class="enroll-btn"
            
            onclick="enrollCourse(${index})">

                Enroll Now

            </button>



        </div>


        `;



    });


}





// ===============================
// ENROLL COURSE
// ===============================


function enrollCourse(index){



    if(!loggedInUser){


        alert("Please login first!");

        window.location.href="signin.html";

        return;

    }





    let course = courses[index];





    let enrolledCourses =

    JSON.parse(
        localStorage.getItem("enrolledCourses")
    )
    || [];





    // Check duplicate enrollment


    let alreadyEnrolled =

    enrolledCourses.some(item =>


        item.courseId === course.id &&

        item.studentEmail === loggedInUser.email


    );






    if(alreadyEnrolled){


        alert(
            "You already enrolled in this course!"
        );


        return;


    }







    // Add enrollment


    let enrollment = {


        courseId:course.id,


        courseName:course.title,


        category:course.category,


        instructor:course.instructor,


        duration:course.duration,


        studentEmail:loggedInUser.email,


        progress:0,


        status:"Not Started"



    };







    enrolledCourses.push(enrollment);




    localStorage.setItem(

        "enrolledCourses",

        JSON.stringify(enrolledCourses)

    );








    // Add progress entry


    let progressData =


    JSON.parse(
        localStorage.getItem("progressData")
    )
    || [];





    progressData.push({


        courseId:course.id,


        courseName:course.title,


        instructor:course.instructor,


        progress:0,


        studentEmail:loggedInUser.email



    });






    localStorage.setItem(

        "progressData",

        JSON.stringify(progressData)

    );






    alert(

        course.title+
        " enrolled successfully!"

    );



}








// ===============================
// SEARCH COURSES
// ===============================



if(searchInput){


searchInput.addEventListener(
"keyup",
function(){



    let value =
    this.value.toLowerCase();





    let filtered = courses.filter(course =>



        course.title
        .toLowerCase()
        .includes(value)



        ||

        course.category
        .toLowerCase()
        .includes(value)



        ||

        course.instructor
        .toLowerCase()
        .includes(value)



    );





    displayCourses(filtered);



});



}








// ===============================
// ADMIN FUNCTIONS
// ===============================



function deleteCourse(index){



    let confirmDelete =
    confirm(
        "Delete this course?"
    );



    if(confirmDelete){


        courses.splice(index,1);



        localStorage.setItem(

            "courses",

            JSON.stringify(courses)

        );



        displayCourses();



    }


}







function editCourse(index){


    localStorage.setItem(

        "editCourseIndex",

        index

    );



    window.location.href =
    "edit-course.html";


}


// Load courses

displayCourses();