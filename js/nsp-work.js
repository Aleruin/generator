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

function loadAnswerRequest() {
    var request = new XMLHttpRequest();
    
    request.open('GET', 'server.js', true);
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

const fullNameInput = document.getElementById('full-name-field');
const groupInput = document.getElementById('group-field');
const continueButton = document.getElementById('continue');
// const saveInFileButton = document.getElementById('save-local');

// saveOnServerButton.onclick = function (event) {
//     event.preventDefault();
// }

continueButton.onclick = function (event) {
    event.preventDefault();
}

fullNameInput.addEventListener("click", function() {clearFullNameField(this);} );
groupInput.addEventListener("click", function() {clearGroupField(this);} );








