function addRow(id) {
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];

    if (isEmptyInput(table)) {
        alert('Одно из полей пустое');
        return;
    }

    if (wrongFacts(table)) {
        alert('Неправильно введено значение фактов');
        return;
    }

    if (wrongRules(table)) {
        alert('Неправильно введено значение правил');
        return;
    }

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

function rowsCounter(id) {
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];
    return table.children.length + 1;
}

function deleteRow(id) {
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];

    if (table.children.length > 1) {
        table.removeChild(table.lastElementChild);
    }    
}

function isEmptyInput(elem) {   
    for (let i = 1; i < elem.querySelector('tr:last-child').children.length; i++) {
        if (elem.querySelector('tr:last-child').getElementsByTagName('input')[i - 1].value == '') { //добавить проверку на пустые пробелы 
            return true;                                                                        
        } 
    }

    return false;
}

function wrongFacts(elem) {
    if (elem.querySelectorAll('input')[0].value.match(/[A-Z],?/) == null) { //добавить проверку поля на пустые пробелы
        return true;
    }
    
    return false;
}

function wrongRules(elem) {
    for (let i = 2; i < elem.querySelector('tr:last-child').children.length; i++) {
        if (elem.querySelectorAll('input')[i - 1].value.match(/[0-9],?/) == null) { //добавить проверку поля на пустые пробелы
            return true; 
        }
    }

    return false;
}

function stopReload() {
    const formElements = document.querySelectorAll('input[type="submit"], button');

    for (let i = 0; i < formElements.length; i++){
        formElements[i].onclick = function (event) {
            event.preventDefault();
        }
    }
   
}

const addButtonFirstTable = document.getElementsByClassName('add')[0];
const removeButtonFirstTable = document.getElementsByClassName('remove')[0];
const addButtonSecondTable = document.getElementsByClassName('add')[1];
const removeButtonSecondTable = document.getElementsByClassName('remove')[1];



function main() {
    addButtonFirstTable.addEventListener("click", function() {addRow('first-table')} );
    removeButtonFirstTable.addEventListener("click", function() {deleteRow('first-table')} );
    addButtonSecondTable.addEventListener("click", function() {addRow('second-table')} );
    removeButtonSecondTable.addEventListener("click", function() {deleteRow('second-table')} );
    stopReload();
}

main();