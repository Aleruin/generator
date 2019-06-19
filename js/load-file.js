const chooseButton = document.getElementById('load-file');
const checkDecisionButton = document.getElementById('check-result');
const reader = new FileReader();

function saveFileInStorage(file) {
    console.log(file);
    return sessionStorage.setItem('decisionFile', JSON.stringify(file));    
}

chooseButton.onchange = function(event) {
    event.preventDefault();

    var selectedFile = chooseButton.files[0];
    
    reader.readAsText(selectedFile);
}

reader.onload = function(event) {
    var contents = event.target.result;

    var userDecision = JSON.parse(contents);  
    console.log(userDecision);
    saveFileInStorage(userDecision);
    let obj = sessionStorage.getItem('decisionFile');
    console.log(JSON.parse(obj));
}

checkDecisionButton.onclick = function(event) {
    window.location.href='task.html';
}

