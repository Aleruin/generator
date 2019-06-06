window.onload = function() {
    const taskTableBody = document.getElementById('variant').getElementsByTagName('tbody')[0];
    const tdElements = taskTableBody.querySelectorAll('td');

    taskRequest("variants.json", function(text){
        let data = JSON.parse(text);

        for (let i = 0; i < data[0].rulesBase.length; i++) {
            let li = document.createElement('li');
            li.innerText = data[0].rulesBase[i];
            li.style.paddingBottom = 5; 
            tdElements[0].querySelector('ol').appendChild(li);
        }
        
        tdElements[1].innerText = data[1].factsBase;
    });
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

