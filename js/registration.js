function Student(lastName, firstName, patronymic, groupNumber) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.patronymic = patronymic;
    this.groupNumber = groupNumber;
}

let fullNameInputFlag = true;
let groupInputFlag = true;

function clearFullNameField(target) {
    if (fullNameInputFlag) {
        target.value = "";
        fullNameInputFlag = false;
    }
}

function clearGroupField(target) {
    if (groupInputFlag) {
        target.value = "";
        groupInputFlag = false;
    }
}

function saveStudentDataInStorage(student) {
    return localStorage.setItem('studentData', student);
}

const fullNameInput = document.querySelector('input[name="full-name"]');
const groupInput = document.querySelector('input[name="group-field"]');
const continueButton = document.getElementById('continue');

function serialize() {
    let fullNameArray = fullNameInput.value.split(" ");
    let groupNumber = groupInput.value;

    return JSON.stringify(new Student(fullNameArray[0], fullNameArray[1], fullNameArray[2], groupNumber));
}

continueButton.onclick = function (event) {
    event.preventDefault();
    
    saveStudentDataInStorage(serialize());

    window.location.href='task.html';
}

fullNameInput.addEventListener("click", function() {clearFullNameField(this);} );
groupInput.addEventListener("click", function() {clearGroupField(this);} );








