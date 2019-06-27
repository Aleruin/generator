window.onload = function() {
    const taskTableBody = document.getElementById('variant').getElementsByTagName('tbody')[0];
    const tdElements = taskTableBody.querySelectorAll('td');
    const variant = Math.floor(Math.random() * (11 - 1)) + 1;

    //Загрузка варианта задания локально
    taskRequest("variants/variants.json", function(text){ 
        let data = JSON.parse(text);

        for (let i = 0; i < data[0].rulesBase.length; i++) {
            let li = document.createElement('li');
            li.innerText = data[0].rulesBase[i];
            li.style.paddingBottom = 5; 
            tdElements[0].querySelector('ol').appendChild(li);
        }
        
        tdElements[1].innerText = data[0].factsBase;

        let variantString = document.createElement('b');
        variantString.innerText = "Вариант задания № " + data[0].variantNumber;
        document.querySelector('#variant').insertBefore(variantString, document.getElementsByClassName('task')[0]);
    });

    //Загрузка в таблицы решения задания в случае, если оно не было раньше проверено
    if (sessionStorage.getItem('decisionFile')) { 
        loadDecision(JSON.parse(sessionStorage.getItem('decisionFile')), false);
    }

    //Загрузка в таблицы решения задания в случае, если оно раньше было проверено
    if (sessionStorage.getItem('resultData')) { 
        loadDecision(JSON.parse(sessionStorage.getItem('resultData')), true);    
    }
}

//Запрос на загрузку варианта задания
function taskRequest(file, callback) { 
    var request = new XMLHttpRequest();

    request.open("GET", file, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status == "200") {
            console.log("Запрос успешно обработан!");
            callback(request.responseText);
        } else {
            console.log("Обработка запроса...");
        }
    }

    request.send(null); 
}

//Функция загрузки решения в таблицы
function loadDecision(file, isResult) { 
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
                                fillTable('second-table', 'input[name="user-facts"]', fileDfs.factsBase[i], i, isResult);
                            }
                            break;
                        }
                        case "conflictPluraty": {
                            for (let i = 0; i < fileDfs.conflictPluraty.length; i++){
                                fillTable('second-table', 'input[name="conf-plur"]', fileDfs.conflictPluraty[i], i, isResult);
                            }
                            break;
                        }
                        case "numberOfActivatedRule": {
                            for (let i = 0; i < fileDfs.numberOfActivatedRule.length; i++){
                                fillTable('second-table', 'input[name="active-rule"]', fileDfs.numberOfActivatedRule[i], i, isResult);
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
                                fillTable('first-table', 'input[name="user-facts"]', fileBfs.factsBase[i], i, isResult);
                            }
                            break;
                        }
                        case "conflictPluraty": {
                            for (let i = 0; i < fileBfs.conflictPluraty.length; i++){
                                fillTable('first-table', 'input[name="conf-plur"]', fileBfs.conflictPluraty[i], i, isResult);
                            }
                            break;
                        }
                        case "numberOfActivatedRule": {
                            for (let i = 0; i < fileBfs.numberOfActivatedRule.length; i++){
                                fillTable('first-table', 'input[name="active-rule"]', fileBfs.numberOfActivatedRule[i], i, isResult);
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

//Создает пустую таблицу перед загрузкой данных сохраненного ранее решения задания
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

//Заполняет ячейки таблиц
function fillTable(id, selector, data, index, isResult){ 
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];
    
    table.querySelectorAll(selector)[index].value = data.element;

    if(isResult) {
        checkCell(table.querySelectorAll(selector)[index], data.isCorrect);
    }   
}

//Проверяет, правильно ли был подобран элемент во время решения задания
//Если нет, то помечает поле красным цветом 
function checkCell(inp, isCorrectValue) { 
    if (!isCorrectValue) {                
        inp.style.backgroundColor = '#f37676';
    }
}