function Student(firstName, lastName, patronymic, groupNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
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



function sendStudentData() {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('POST', 'server.js', true);
    // var params = 'fullName=' + encodeURIComponent(fullName) +
    // '&groupField=' + encodeURIComponent(groupField);
    
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == "200") {
            alert(this.responseText);
        } else {
            alert("Что-то пошло не так");
        }
    }

    request.send(); 
}

const fullNameInput = document.querySelector('input[name="full-name"]');
const groupInput = document.querySelector('input[name="group-field"]');
const continueButton = document.getElementById('continue');

function serialize() {
    let fullNameArray = fullNameInput.textContent.split(" ");
    let groupNumber = groupInput.textContent;

    return JSON.stringify(new Student(fullNameArray[0], fullNameArray[1], fullNameArray[2], groupNumber));
}
// const saveInFileButton = document.getElementById('save-local');

// saveOnServerButton.onclick = function (event) {
//     event.preventDefault();
// }

continueButton.onclick = function (event) {
    event.preventDefault();
    sendStudentData(serialize());
}

fullNameInput.addEventListener("click", function() {clearFullNameField(this);} );
groupInput.addEventListener("click", function() {clearGroupField(this);} );








