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
        let inp = document.createElement('input');

        td.appendChild(inp);
        row.appendChild(td); 
    }

    table.appendChild(row);
}

function deleteRow(id) {
    const table = document.getElementById(id).getElementsByTagName('tbody')[0];

    if (table.children.length > 1) {
        table.removeChild(table.lastElementChild);
    }    
}

function isEmptyInput(elem) {   
    for (let i = 0; i < elem.querySelector('tr:last-child').children.length; i++) {
        if (elem.querySelector('tr:last-child').getElementsByTagName('input')[i].value == '') { //добавить проверку на пустые пробелы 
            return true;                                                                        
        } 
    }

    return false;
}

function wrongFacts(elem) {
    if (elem.querySelectorAll('input')[1].value.match(/[A-Z],?/) == null) { //добавить проверку поля на пустые пробелы
        return true;
    }
    
    return false;
}

function wrongRules(elem) {
    for (let i = 2; i < elem.querySelector('tr:last-child').children.length; i++) {
        if (elem.querySelectorAll('input')[i].value.match(/[0-9],?/) == null) { //добавить проверку поля на пустые пробелы
            return true; 
        }
    }

    return false;
}

const addButtonFirstTable = document.getElementsByClassName('add')[0];
const removeButtonFirstTable = document.getElementsByClassName('remove')[0];
const addButtonSecondTable = document.getElementsByClassName('add')[1];
const removeButtonSecondTable = document.getElementsByClassName('remove')[1];

function main() {
    console.log(2);
    addButtonFirstTable.addEventListener("click", function() {addRow('first-table')} );
    removeButtonFirstTable.addEventListener("click", function() {deleteRow('first-table')} );
    addButtonSecondTable.addEventListener("click", function() {addRow('second-table')} );
    removeButtonSecondTable.addEventListener("click", function() {deleteRow('second-table')} );
}

main();