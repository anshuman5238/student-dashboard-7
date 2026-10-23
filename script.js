let students = [
    { name: "Pranjal", age: 20, course: "Computer Science" },
    { name: "Anshuman", age: 20, course: "BBA" },
    { name: "Sachin", age: 21, course: "BMS" }
];

let showBtn = document.getElementById("showBtn");
let openModalBtn = document.getElementById("openModalBtn");
let themeBtn = document.getElementById("themeBtn");
let studentContainer = document.getElementById("studentContainer");
let msg = document.getElementById("msg");

let modal = document.getElementById("modal");
let submitBtn = document.getElementById("submitBtn");
let cancelBtn = document.getElementById("cancelBtn");

let nameInput = document.getElementById("nameInput");
let ageInput = document.getElementById("ageInput");
let courseInput = document.getElementById("courseInput");

function showStudents() {
    studentContainer.innerHTML = "";

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

function addStudentPromise(newStudent) {
    return new Promise((resolve, reject) => {
        if (!newStudent.name || !newStudent.age || !newStudent.course) {
            reject("Please fill in all fields!");
        } else {
            setTimeout(() => {
                students.push(newStudent);
                resolve("Student added successfully!");
            }, 2000);
        }
    });
}

async function handleAddStudent() {
    let userStudent = {
        name: nameInput.value.trim(),
        age: ageInput.value.trim(),
        course: courseInput.value.trim()
    };

    modal.classList.remove("active");
    msg.innerText = "Adding student, please wait...";

    try {
        let result = await addStudentPromise(userStudent);
        msg.innerText = result;
        showStudents();

        nameInput.value = "";
        ageInput.value = "";
        courseInput.value = "";
    } catch (error) {
        msg.innerText = error;
    }
}

function changeTheme() {
    document.body.classList.toggle("dark");
}

showBtn.addEventListener("click", function() {
    showStudents();
    msg.innerText = "Showing all students.";
});

openModalBtn.addEventListener("click", function() {
    modal.classList.add("active");
    msg.innerText = "";
});

cancelBtn.addEventListener("click", function() {
    modal.classList.remove("active");
    nameInput.value = "";
    ageInput.value = "";
    courseInput.value = "";
});

submitBtn.addEventListener("click", handleAddStudent);

themeBtn.addEventListener("click", changeTheme);