window.onload = function() {
    const taskTableBody = document.getElementById('variant').getElementsByTagName('tbody')[0];
    const tdElements = taskTableBody.querySelectorAll('td');
    const variant = Math.floor(Math.random() * (11 - 1)) + 1;

    taskRequest("variants/variants.json", function(text){
        let data = JSON.parse(text);

        for (let i = 0; i < data[variant - 1].rulesBase.length; i++) {
            let li = document.createElement('li');
            li.innerText = data[variant - 1].rulesBase[i];
            li.style.paddingBottom = 5; 
            tdElements[0].querySelector('ol').appendChild(li);
        }
        
        tdElements[1].innerText = data[variant - 1].factsBase;

        let variantString = document.createElement('b');
        variantString.innerText = "Вариант задания № " + data[variant - 1].variantNumber;
        document.querySelector('#variant').insertBefore(variantString, document.getElementsByClassName('task')[0]);
    });

    if (sessionStorage.getItem('decisionFile')) {
        loadDecision(JSON.parse(sessionStorage.getItem('decisionFile')));
    }
}

function taskRequest(file, callback) {
    var request = new XMLHttpRequest();

    request.open("GET", file, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status == "200") {
            callback(request.responseText);
        }
    }

    request.send(null); 

}

function loadDecision(file) {
    for (var fileDecisionProps in file.decision) {
        switch (fileDecisionProps) {
            case "variantNumber": break;
            case "dfsMethod": {
                let fileDfs = file.decision.dfsMethod;
                
                Object.keys(fileDfs).forEach(function(prop) {
                    switch (prop) {
                        case "stepNumber": {
                            createEmptyTable('second-table', fileDfs);
                            break;
                        };
                        case "factsBase": {
                            for (let i = 0; i < fileDfs.factsBase.length; i++){
                                fillTable('second-table', 'input[name="user-facts"]', fileDfs.factsBase[i].element, i);
                            }
                            break;
                        }
                        case "conflictPluraty": {
                            for (let i = 0; i < fileDfs.conflictPluraty.length; i++){
                                fillTable('second-table', 'input[name="conf-plur"]', fileDfs.conflictPluraty[i].element, i);
                            }
                            break;
                        }
                        case "numberOfActivatedRule": {
                            for (let i = 0; i < fileDfs.numberOfActivatedRule.length; i++){
                                fillTable('second-table', 'input[name="active-rule"]', fileDfs.numberOfActivatedRule[i].element, i);
                            }
                            break;
                        }
                    }
                })

                break;                                                   
            }
            
            case "bfsMethod": {
                let fileBfs = file.decision.bfsMethod;
            
                Object.keys(fileBfs).forEach(function(prop){
                    switch (prop) {
                        case "stepNumber": {
                            createEmptyTable('first-table', fileBfs);
                            break;
                        }
                        case "factsBase": {
                            for (let i = 0; i < fileBfs.factsBase.length; i++){
                                fillTable('first-table', 'input[name="user-facts"]', fileBfs.factsBase[i].element, i);
                            }
                            break;
                        }
                        case "conflictPluraty": {
                            for (let i = 0; i < fileBfs.conflictPluraty.length; i++){
                                fillTable('first-table', 'input[name="conf-plur"]', fileBfs.conflictPluraty[i].element, i);
                            }
                            break;
                        }
                        case "numberOfActivatedRule": {
                            for (let i = 0; i < fileBfs.numberOfActivatedRule.length; i++){
                                fillTable('first-table', 'input[name="active-rule"]', fileBfs.numberOfActivatedRule[i].element, i);
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

function createEmptyTable(id, method) {
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];

    for (let i = 1; i < method.stepNumber.length; i++){
        const row = document.createElement('tr');

        for (let i = 0; i < 4; i++) {
            let td = document.createElement('td');
            
            if (i == 0) {
                td.innerText = rowsCounter(id);
            } else {
                let inp = document.createElement('input');
                switch (i) {
                    case 1: inp.name = "user-facts"; break;
                    case 2: inp.name = "conf-plur"; break;
                    case 3: inp.name = "active-rule"; break;
                }
    
                td.appendChild(inp);
            }
            
            row.appendChild(td); 
        }
    
        table.appendChild(row);
    }
}

function fillTable(id, selector, data, index){
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];
    
    table.querySelectorAll(selector)[index].value = data;
}