function Answer(stepNumber, userFactsBase, conflictPluraty, numberOfActivatedRule) {
    this.stepNumber = stepNumber;
    this.userFactsBase = userFactsBase;
    this.conflictPluraty = conflictPluraty;
    this.numberOfActivatedRule = numberOfActivatedRule;
}

function serialize(form) {
    if (form.nodeName !== "FORM") return false;

    let firstTable = form.querySelector('#first-table');
    let secondTable = form.querySelector('#second-table');
    let tables = [firstTable, secondTable];
    let result = [];

    tables.forEach(function(table) {
        let stepCounter = 0, stepNumber = [], userFactsBase = [], conflictPluraty = [], numberOfActivatedRule = [];
        let inp = table.getElementsByTagName('input');

        for (let i = 0; i < inp.length; i++) {
            switch(inp[i].name) {
                case "user-facts": {
                    userFactsBase.push(inp[i].value);
                    break;
                }
                case "conf-plur": {
                    conflictPluraty.push(inp[i].value);
                    break;
                }
                case "active-rule": {
                    numberOfActivatedRule.push(inp[i].value);
                    break;
                }
            }

            if (i % 3 == 0){
                stepNumber.push(stepCounter);
                stepCounter++;
            }             
        }
        
        result.push(new Answer(stepNumber, userFactsBase, conflictPluraty, numberOfActivatedRule));
        
        stepCounter = 0;
    })

    return JSON.stringify(result);
}

function loadAnswerRequest() {
    var request = new XMLHttpRequest();

    request.open("POST", file, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status == "200") {
            callback(request.responseText);
        }
    }

    request.send(null); 
}

const loadForm = document.forms[0];
console.log(loadForm.nodeName);
const saveButton = document.querySelector('input[type="submit"]');
saveButton.onclick = function (event) {
    event.preventDefault();
    console.log(serialize(loadForm));
}
//saveButton.addEventListener("submit", function() { serialize(loadForm) });

// function include(url) {
//         var script = document.createElement('script');
//         script.src = url;
//         document.getElementsByTagName('head')[0].appendChild(script);
//     }

// include("/js/script.js");

//console.log(loadForm.querySelector('#first-table'));