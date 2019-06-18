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

