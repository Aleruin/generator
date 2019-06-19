const fileButton = document.getElementById('compare');
const reader = new FileReader();

function fileComparison(file) {
    var decisions = [];

    loadDecisionRequest("variants/exampleDecision.json")
        .then (function(data) {
            decisions = JSON.parse(data);

            decisions.forEach(function(variantDecision){
        
                if (variantDecision.variantNumber == 1)
                {
                    for (var fileDecisionProps in file.decision) {
                        console.log(fileDecisionProps);
                        switch (fileDecisionProps) {
                            case "variantNumber": break;
                            case "dfsMethod": {
                                let fileDfs = file.decision.dfsMethod;
                                let variantDfs = variantDecision.dfsMethod;

                                Object.keys(fileDfs).forEach(function(prop) {
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
                                                console.log(variantDfs.numberOfActivatedRule[i]);
                                                if (fileDfs.numberOfActivatedRule[i].element === variantDfs.numberOfActivatedRule[i]) {
                                                    fileDfs.numberOfActivatedRule[i].isCorrect = 1;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                })

                                break;                                                   
                            }
                            
                            case "bfsMethod": {
                                let fileBfs = file.decision.bfsMethod;
                                let variantBfs = variantDecision.bfsMethod;

                                Object.keys(fileBfs).forEach(function(prop){
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
                                });

                                break;
                            }                
                        }
                    }
                }                           
        });
    }, 
    function(reason){
        console.error(reason);
    }); 

    console.log(file);
}

function loadDecisionRequest(file) {
    let promise = new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();

        request.overrideMimeType("application/json");
        request.open("GET", file, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status == "200") {
                resolve(request.responseText);
            } else {
                console.error(reject);
            }
        }

        request.send(null);

    });

    return promise;    
}

fileButton.onchange = function(event) {
    event.preventDefault();

    var selectedFile = fileButton.files[0];
    
    reader.readAsText(selectedFile);
}

reader.onload = function(event) {
    var contents = event.target.result;

    var userDecision = JSON.parse(contents);
    
    fileComparison(userDecision);
   
}