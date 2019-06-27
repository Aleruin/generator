window.onload = function() {
    sessionStorage.clear();
}

const fileButton = document.getElementById('compare');
const continueButton = document.getElementById('continue');
const reader = new FileReader();

//функция, в которой приведен алгоритм сравнения данных ответа студента с данными правильного решения
function fileComparison(file) { 
    var decisions = [], returningValue;

    return new Promise(function(resolve, reject){
        return loadDecisionRequest("variants/exampleDecision.json", function(data) {           
            decisions = JSON.parse(data);
            
            decisions.forEach(function(variantDecision){
        
            if (variantDecision.variantNumber == 1)
            {
                for (var fileDecisionProps in file.decision) {
                    switch (fileDecisionProps) {
                        case "variantNumber": break;
                        case "dfsMethod": {
                            let fileDfs = file.decision.dfsMethod;
                            let variantDfs = variantDecision.dfsMethod;
 
                            for (var prop in fileDfs){
                                switch (prop) {
                                    case "stepNumber": break;
                                    case "factsBase": {
                                        for (let i = 0; i < fileDfs.factsBase.length; i++){
                                            if (fileDfs.factsBase[i].element === variantDfs.factsBase[i]) {
                                                fileDfs.factsBase[i].isCorrect = 1;
                                            }
                                        }
                                        break;
                                    }
                                    case "conflictPluraty": {
                                        for (let i = 0; i < fileDfs.conflictPluraty.length; i++){
                                            if (fileDfs.conflictPluraty[i].element === variantDfs.conflictPluraty[i]) {
                                                fileDfs.conflictPluraty[i].isCorrect = 1;
                                            }
                                        }
                                        break;
                                    }
                                    case "numberOfActivatedRule": {
                                        for (let i = 0; i < fileDfs.numberOfActivatedRule.length; i++){
                                            if (fileDfs.numberOfActivatedRule[i].element === variantDfs.numberOfActivatedRule[i]) {
                                                fileDfs.numberOfActivatedRule[i].isCorrect = 1;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                            break;                                                                  
                        }
                        
                        case "bfsMethod": {
                            let fileBfs = file.decision.bfsMethod;
                            let variantBfs = variantDecision.bfsMethod;

                            for (var prop in fileBfs){
                            {
                                switch (prop) {
                                    case "stepNumber": break;
                                    case "factsBase": {
                                        for (let i = 0; i < fileBfs.factsBase.length; i++){
                                            if (fileBfs.factsBase[i].element === variantBfs.factsBase[i]) {
                                                fileBfs.factsBase[i].isCorrect = 1;
                                            }
                                        }
                                        break;
                                    }
                                    case "conflictPluraty": {
                                        for (let i = 0; i < fileBfs.conflictPluraty.length; i++){
                                            if (fileBfs.conflictPluraty[i].element === variantBfs.conflictPluraty[i]) {
                                                fileBfs.conflictPluraty[i].isCorrect = 1;
                                            }
                                        }
                                        break;
                                    }
                                    case "numberOfActivatedRule": {
                                        for (let i = 0; i < fileBfs.numberOfActivatedRule.length; i++){
                                            if (fileBfs.numberOfActivatedRule[i].element === variantBfs.numberOfActivatedRule[i]) {
                                                fileBfs.numberOfActivatedRule[i].isCorrect = 1;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        break;                
                    }
                }
            }
        }             
    });
    
    returningValue = JSON.stringify(file);
    resolve (returningValue);
    });
})
}                                   

//обращение к файлу с правильными решениями в виде запроса
function loadDecisionRequest(filePath, callback) { 
    var request = new XMLHttpRequest();

        request.open("GET", filePath, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status == "200") {
                console.log(request.responseText);
                callback(request.responseText);
            } 
        }

        request.send();     
}

//сохранение в локальном хранилище данных о результате проверки задания
function saveFileResultInStorage(file) {
    let data = JSON.parse(file).student;
    sessionStorage.setItem('studentData', JSON.stringify(data));
    sessionStorage.setItem('resultData', file);
    sessionStorage.setItem('isChecking', true);
}

fileButton.onchange = function(event) {
    event.preventDefault();

    let selectedFile = fileButton.files[0];
    
    reader.readAsText(selectedFile);
}

reader.onload = function(event) {
    var contents = event.target.result;

    var userDecision = JSON.parse(contents);

    fileComparison(userDecision)
       .then(function(res){
           saveFileResultInStorage(res);
       })
       .catch(function(error){
           console.log("В ходе обработки данных произошел сбой.");
       })
}

continueButton.onclick = function(event) {
    event.preventDefault();

    window.open("/task", "_self");
}