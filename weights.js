var poids = [];

var console3 = document.getElementById("Console3");

function addWeightsCheckBox() {
    var checkbox = document.getElementById('weightCheckbox');
    

    if (checkbox.checked) {
        console.log("drawn paths:", drawnPaths);
        drawnPaths.forEach(function(item) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textElement.setAttribute("font-family", "Arial");
            textElement.setAttribute("font-size", "20");
            var textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + item.getAttribute("id"));
            textPath.setAttribute("startOffset", "50%");
            textPath.setAttribute("text-anchor", "middle");
            textPath.addEventListener("click", function(event) {
                // Prompt the user to enter new text
                var newText = prompt("Enter new weight:");
                
                // Update the text content of the textPath element
                if (newText !== null) {
                    textPath.textContent = newText;
                }

                poids.push(newText);
                console3.textContent = poids.join(',');
            });
            textPath.textContent = "0";
            textElement.appendChild(textPath);
            item.parentNode.appendChild(textElement);
        });
        
    } else {
        drawnPaths.forEach(function(item) {
            item.removeAttribute("contenteditable", "true");
        });
    }
}