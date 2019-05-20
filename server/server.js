window.onload = function() {
    const taskTableBody = document.getElementById('variant').getElementsByTagName('tbody')[0];
    const tdElements = taskTableBody.querySelectorAll('td');
    
    $.getJSON("variants.json", function(json) {
        console.log(json); // this will show the info it in firebug console
    });
    // var jsonFiles = jsonGet();
    // tdElements[0].value = jsonFiles[0].rulesBase;
    // tdElements[1].value = jsonFiles[0].factsBase;
}



//usage:
