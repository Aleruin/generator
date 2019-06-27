window.onload = function() {
    sessionStorage.clear();
}

const registrationButton = document.getElementById('registration');
const chooseButton = document.getElementById('load-file');
const checkDecisionButton = document.getElementById('check-file');
const checkResultButton = document.getElementById('check-result');
const reader = new FileReader();

//Функция сохранения решения файла (еще не готового) в локальном хранилище 
function saveFileInStorage(file) {
    sessionStorage.setItem('studentData', JSON.stringify(file.student));
    sessionStorage.setItem('decisionFile', JSON.stringify(file));    
}

//Если состояние кнопки "Выберите файл" меняется (выбирается файл из диалогового окна), 
//то выбранный файл читается как текст и event.target.result 
chooseButton.onchange = function(event) {
    event.preventDefault();

    var selectedFile = chooseButton.files[0];
    
    reader.readAsText(selectedFile);
}

//При загрузке экземпляра FileReader выполняется функция занесения данных решения 
//в локальное хранилище
reader.onload = function(event) {
    var contents = event.target.result;
    var userDecision = JSON.parse(contents);  

    saveFileInStorage(userDecision);
}

registrationButton.onclick = function() {
    sessionStorage.setItem('isRegister', true);
    window.open("/registration", "_self");    
}

checkDecisionButton.onclick = function() {
    sessionStorage.setItem('isEditing', true);
    window.open("/task", "_self");
}

checkResultButton.onclick = function() {
    sessionStorage.setItem('isChecking', true);
    window.open("/registration", "_self");
}

