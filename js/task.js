window.onload = function() {
    const taskTableBody = document.getElementById('variant').getElementsByTagName('tbody')[0];
    const tdElements = taskTableBody.querySelectorAll('td');
    ajaxJSON("variants.json", function(text){
        var data = JSON.parse(text);
        tdElements[0].innerHTML = data[0].rulesBase;
        tdElements[1].innerHTML = data[1].factsBase;
    });
 }

function ajaxJSON(file, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", file, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status == "200") {
            callback(request.responseText);
        }
    }
    request.send(null); 

}

