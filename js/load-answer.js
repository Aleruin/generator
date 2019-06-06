function serialize(form) {
    if (form.nodeName !== "FORM") return false;

    const loadForm = document.querySelector('#answer-form');
    let stepCounter = 1, stepNumber = [], userFactsBase = [], conflictPluraty = [], numberOfActivatedRule = [];
    let loadFormElements = loadForm.elements;

    for (let i = 0; i < loadForm.length; i++) {
        switch(loadFormElements[i].nodeName) {
            case 'INPUT': {
                switch(loadFormElements[i].name) {
                    case "user-facts": {
                        userFactsBase.push(loadFormElements[i].value);
                        break;
                    }
                    case "conf-plur": {
                        conflictPluraty.push(loadFormElements[i].value);
                        break;
                    }
                    case "active-rule": {
                        numberOfActivatedRule.push(loadFormElements[i].value);
                        break;
                    }

                }

                stepNumber.push(stepCounter);
                stepCounter++;
            }
            case 'BUTTON': break;
        }
    }
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


