function Student(lastName, firstName, patronymic, groupNumber) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.patronymic = patronymic;
    this.groupNumber = groupNumber;
}

let fullNameInputFlag = true;
let groupInputFlag = true;

function isWrongFullName(elem) {   
    if (elem.value.match(/[А-Я]{1}[а-я]+/g).length == 3) {
        return true;
    } else {
        return false;
    }
}

function isWrongGroupNumber(elem) {   
    if (/[1-9]{1}[0-9]{2}(-[1-2])?/.test(elem.value)) {
        return true;
    } else {
        return false;
    }
}

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

//Сохраняет данные студента в локальном хранилище браузера
function saveStudentDataInStorage(student) { 
    return sessionStorage.setItem('studentData', student);
}

const fullNameInput = document.querySelector('input[name="full-name"]');
const groupInput = document.querySelector('input[name="group-field"]');
const continueButton = document.getElementById('continue');

//Сериализует введенные данные ФИО и номера группы
function serialize() { 
    let fullNameArray = fullNameInput.value.split(" ");
    let groupNumber = groupInput.value;
    
    return JSON.stringify(new Student(fullNameArray[0], fullNameArray[1], fullNameArray[2], groupNumber));
}

// после выбора функции "Посмотреть результаты"
function sendStudentData() { 
    return new Promise(function(res, rej){ 
        let request = new XMLHttpRequest();
    
        request.open("POST", '/data', true);
        
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status == "200") {
                res(this.responseText);
            } else {
                console.log("Request handling...");
            }
        }

        request.onerror = function() {
            rej(new Error("Network Error"));
          };

        request.send(serialize());
    })    
}

//переход при нажатии кнопки "Продолжить" на следующую страницу
continueButton.onclick = function() { 
    if (!isWrongFullName(fullNameInput)) {
        alert('Неверно введены данные ФИО!');
        return;
    }

    if (!isWrongGroupNumber(groupInput)) {
        alert('Неверно введен номер группы!');
        return;
    }

    if (sessionStorage.getItem('isChecking')) {
        sendStudentData() 
        .then(function(res){
            let data = JSON.parse(res);
            sessionStorage.setItem('studentData', JSON.stringify(data.student));
            sessionStorage.setItem('resultData', res);
            window.open("/task", "_self");
        }, 
        function(err){
         alert(err);
        }
     );     
    } else if (sessionStorage.getItem('isRegister')) {
        saveStudentDataInStorage(serialize()); //используется, если студент решает задание с нуля
        window.open("/task", "_self");
    } else {
        alert("В ходе процесса обработки данных произошел сбой.");   
    }
}

fullNameInput.addEventListener("click", function() {clearFullNameField(this);} );
groupInput.addEventListener("click", function() {clearGroupField(this);} );








