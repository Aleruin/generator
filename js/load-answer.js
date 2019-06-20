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
    let result = [], studentData = {};

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

    studentData = JSON.parse(localStorage.getItem('studentData'));
 
    let fileDecision = new FileDecision(studentData, decision);

    return JSON.stringify(fileDecision);
}

function loadAnswerRequest() {
    var request = new XMLHttpRequest();
    
    request.open('POST', 'server.js', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == "200") {
            console.log(this.responseText + 'это не сервер');
            alert(this.responseText);
        } else {
            alert("Что-то пошло не так");
        }
    }

    request.send(localSerialize()); 
}

function transliterate(word){
    let answer = "", a = {};

   a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
   a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
   a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="a";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
   a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
   a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
   a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";

   for (let i in word){
     if (word.hasOwnProperty(i)) {
       if (a[word[i]] === undefined){
         answer += word[i];
       } else {
         answer += a[word[i]];
       }
     }
   }
   return answer;
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
    let studentFullName = JSON.parse(localStorage.getItem('studentData'));
    let abbr = "";

    Object.keys(studentFullName).forEach(function(prop){
        switch (prop) {
            case "groupNumber": break;
            case "firstName": {
                abbr += studentFullName[prop].charAt(0).toLowerCase();
                break;
            }
            case "lastName": {
                abbr += studentFullName[prop].charAt(0).toLowerCase();
                break;
            }
            case "patronymic": {
                abbr += studentFullName[prop].charAt(0).toLowerCase();
                break;
            }
        }
    })
 
    saveAs(blob, transliterate(abbr) + studentFullName.groupNumber + ".json");
}