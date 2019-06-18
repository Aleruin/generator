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
    // window.location.href = "save.html"; 
}

localSaveButton.onclick = function (event) {
    event.preventDefault();

    let blob = new Blob([localSerialize()], {type: "application/json"});
   
    saveAs(blob, "answer.json");
}
//saveButton.addEventListener("submit", function() { serialize(loadForm) });

// function include(url) {
//         var script = document.createElement('script');
//         script.src = url;
//         document.getElementsByTagName('head')[0].appendChild(script);
//     }

// include("/js/script.js");

//console.log(loadForm.querySelector('#first-table'));

// function serialize(forms) {
//     var q = [];

//     for (let j = 0; j < forms.length; j++)
//     {
//         for (let i = 0; i < forms[j].elements.length; i++) {
//             if (forms[j].elements[i].name === "") continue;
    
//             switch(forms[j].elements[i].nodeName) {
//                 case 'INPUT': {
//                     q.push(forms[j].elements[i].name + j +"=" + encodeURIComponent(forms[j].elements[i].value));
//                     break;
//                 }
//                 case 'BUTTON': break;
//             }
//         }
//     }

//     return q.join("&");
// }