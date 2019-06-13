function Answer(stepNumber, userFactsBase, conflictPluraty, numberOfActivatedRule) {
    this.stepNumber = stepNumber;
    this.userFactsBase = userFactsBase;
    this.conflictPluraty = conflictPluraty;
    this.numberOfActivatedRule = numberOfActivatedRule;
}

function serialize(forms) {
    var q = [];

    for (let j = 0; j < forms.length; j++)
    {
        for (let i = 0; i < forms[j].elements.length; i++) {
            if (forms[j].elements[i].name === "") continue;
    
            switch(forms[j].elements[i].nodeName) {
                case 'INPUT': {
                    q.push(forms[j].elements[i].name + j +"=" + encodeURIComponent(forms[j].elements[i].value));
                    break;
                }
                case 'BUTTON': break;
            }
        }
    }

    return q.join("&");
}

function localSerialize() {
    let firstTable = document.querySelector('#first-table');
    let secondTable = document.querySelector('#second-table');
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

function loadAnswerRequest(answerForms) {
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
const saveButton = document.querySelector('input[type="button"]');

saveButton.onclick = function (event) {
    event.preventDefault();
    console.log(localSerialize());
    loadAnswerRequest(arrayForms);

  
    // let blob = new Blob([localSerialize()], {type: "application/json"});
   
    // saveAs(blob, "answer.json");

}
//saveButton.addEventListener("submit", function() { serialize(loadForm) });

// function include(url) {
//         var script = document.createElement('script');
//         script.src = url;
//         document.getElementsByTagName('head')[0].appendChild(script);
//     }

// include("/js/script.js");

//console.log(loadForm.querySelector('#first-table'));

