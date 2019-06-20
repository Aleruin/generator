const registrationButton = document.getElementById('registration');
const chooseButton = document.getElementById('load-file');
const checkDecisionButton = document.getElementById('check-file');
const checkResultButton = document.getElementById('check-result');
const reader = new FileReader();

function saveFileInStorage(file) {
    return localStorage.setItem('decisionFile', JSON.stringify(file));    
}

chooseButton.onchange = function(event) {
    event.preventDefault();

    var selectedFile = chooseButton.files[0];
    
    reader.readAsText(selectedFile);
}

reader.onload = function(event) {
    var contents = event.target.result;
    var userDecision = JSON.parse(contents);  

    saveFileInStorage(userDecision);
}

registrationButton.onclick = function() {
    window.location.href='registration.html';
}

checkDecisionButton.onclick = function() {
    window.location.href='task.html';
}

checkResultButton.onclick = function() {
    window.location.href='registration.html';
}

