function Answer(stepNumber, factsBase, conflictPluraty, numberOfActivatedRule) {
    this.stepNumber = stepNumber;
    this.factsBase = factsBase;
    this.conflictPluraty = conflictPluraty;
    this.numberOfActivatedRule = numberOfActivatedRule;
}

function ElementStructure(element, isCorrect) {
    this.element = element;
    this.isCorrect = isCorrect;
}

function Decision(dfsMethod, bfsMethod) {
    this.dfsMethod = dfsMethod;
    this.bfsMethod = bfsMethod;
}

function FileDecision(student, decision) {
    this.student = student;
    this.decision = decision;
}

function localSerialize() {
    let firstTable = document.querySelector('#second-table'); //потом ИСПРАВИТЬ!
    let secondTable = document.querySelector('#first-table'); //потом ИСПРАВИТЬ!
    let decision = new Decision();
    let tables = [firstTable, secondTable];
    let result = [];

    tables.forEach(function(table) {
        let stepCounter = 0, stepNumber = [], factsBase = [], conflictPluraty = [], numberOfActivatedRule = [];
        let inp = table.getElementsByTagName('input');
           
        for (let i = 0; i < inp.length; i++) {
            switch(inp[i].name) {
                case "user-facts": {
                    if (inp[i].value) {
                        factsBase.push(new ElementStructure(inp[i].value, 0));
                    }                  
                    break;
                }
                case "conf-plur": {
                    if (inp[i].value) {
                        conflictPluraty.push(new ElementStructure(inp[i].value, 0));
                    }                    
                    break;
                }
                case "active-rule": {
                    if (inp[i].value) {
                        numberOfActivatedRule.push(new ElementStructure(inp[i].value, 0));
                    }
                    break;
                }
            }

            if (i % 3 == 0){
                stepNumber.push(stepCounter);
                stepCounter++;
            }             
        }
        
        result.push(new Answer(stepNumber, factsBase, conflictPluraty, numberOfActivatedRule));
        stepCounter = 0;
    })

    let i = 0;

    for (var keys in decision) {
        decision[keys] = result[i];
        i++;
    }  

    let fileDecision = new FileDecision("FIO", decision);

    return JSON.stringify(fileDecision);
}

function loadAnswerRequest() {
    var request = new XMLHttpRequest();
    
    request.open('POST', 'server.js', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == "200") {
            alert(this.responseText);
        } else {
            alert("Что-то пошло не так");
        }
    }

    request.send(localSerialize()); 
}

const arrayForms = document.forms;
const loadForm = document.forms[0];
const saveToServerButton = document.querySelector('#send-to-server');
const localSaveButton = document.querySelector('#save-local');

saveToServerButton.onclick = function (event) {
    event.preventDefault();
    loadAnswerRequest();
}

localSaveButton.onclick = function (event) {
    event.preventDefault();

    let blob = new Blob([localSerialize()], {type: "application/json"});
   
    saveAs(blob, "answer.json");
}