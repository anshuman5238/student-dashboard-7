// Initial array with 3 students
let students = [
    { name: "Rahul Sharma", age: 20, course: "Computer Science" },
    { name: "Priya Singh", age: 21, course: "Information Technology" },
    { name: "Amit Kumar", age: 22, course: "Electronics" }
];

// Get elements from HTML
let showBtn = document.getElementById("showBtn");
let addBtn = document.getElementById("addBtn");
let themeBtn = document.getElementById("themeBtn");
let studentContainer = document.getElementById("studentContainer");
let msg = document.getElementById("msg");

let nameInput = document.getElementById("nameInput");
let ageInput = document.getElementById("ageInput");
let courseInput = document.getElementById("courseInput");

// 1. Function using a loop to show all students
function showStudents() {
    studentContainer.innerHTML = ""; // Clear box first

    for (let i = 0; i < students.length; i++) {
        let s = students[i];

        let card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <h3>${s.name}</h3>
            <p>Age: ${s.age}</p>
            <p>Course: ${s.course}</p>
        `;

        studentContainer.appendChild(card);
    }
}

// 2. Add student using a Promise (with 2 seconds delay)
function addStudentPromise(newStudent) {
    return new Promise((resolve, reject) => {
        // Check if any field is blank
        if (!newStudent.name || !newStudent.age || !newStudent.course) {
            reject("Please fill in all fields!");
        } else {
            setTimeout(() => {
                students.push(newStudent);
                resolve("Student added successfully!");
            }, 2000); // 2 second delay
        }
    });
}

// 3. Async / Await function to handle adding the student from inputs
async function handleAddStudent() {
    // Grab whatever the user typed into the input boxes
    let userStudent = {
        name: nameInput.value.trim(),
        age: ageInput.value.trim(),
        course: courseInput.value.trim()
    };

    msg.innerText = "Adding student, please wait...";
    addBtn.disabled = true;

    try {
        let result = await addStudentPromise(userStudent);
        msg.innerText = result;
        showStudents(); // Refresh the list on screen

        // Clear the input boxes after successful addition
        nameInput.value = "";
        ageInput.value = "";
        courseInput.value = "";
    } catch (error) {
        msg.innerText = error; // Shows error if fields are empty
    } finally {
        addBtn.disabled = false;
    }
}

// 4. Change theme function
function changeTheme() {
    document.body.classList.toggle("dark");
}

// Click Events
showBtn.addEventListener("click", function() {
    showStudents();
    msg.innerText = "Showing all students.";
});

addBtn.addEventListener("click", handleAddStudent);

themeBtn.addEventListener("click", changeTheme);