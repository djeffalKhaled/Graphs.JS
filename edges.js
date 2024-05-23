// NON-ORIENTED

/*
Definitions:
- Paths are the SVG elements seen by the user
- E defines the set of edges "arcs, arrette" as known in graph theory
which is a combination of the connected nodes "sommet" representing the drawn path mathematically
- Handle functions relate to when the checkbox is enabled, after the draw() function
- Update functions relate to when the checkbox is disabled, after the confirm() function
*/

var isDragging;
var firstPosX, firstPosY, lastPosX, lastPosY;

var path;
var svg = document.getElementById("drawingArea");
var drawnPaths = []; 
var E = []; // Set of non-oriented Edges
var connectedNodes = []; // The nodes the path will connect to while drawing a path

var click = 0;


// Draws a path / edge when the user clicks on at most 2 given nodes
function handleMouseDown(event) {
    
    var svgNS = "http://www.w3.org/2000/svg";

    click++;  // Handles the first and second elem to draw path between

    if (click == 1) {
        console.log("Clicked on ", event.target.innerHTML);


        // Sets path's style and data
        path = document.createElementNS(svgNS, "path");
        path.id = "path" + drawnPaths.length;
        path.classList.add("path");
        path.setAttribute("stroke", "green");
        path.setAttribute("stroke-width", "10");

        if (graphType === "oriented") {
            path.setAttribute("marker-end", "url(#arrow)");
        }
        

        // gets the first clicked node's center positions
        var rect = event.target.getBoundingClientRect();
        firstPosX = rect.left + rect.width / 2;
        firstPosY = rect.top + rect.height / 2;

        console.log("Mouse Down", firstPosX, " ", firstPosY);
        var pathString = "M" + firstPosX + "," + firstPosY;
        path.setAttribute("d", pathString);


        connectedNodes.push(event.target);
        
    } else if (click == 2) {
        console.log("Clicked on ", event.target.innerHTML);

        // gets the second clicked node's center positions
        var rect = event.target.getBoundingClientRect();
        lastPosX = rect.left + rect.width / 2;
        lastPosY = rect.top + rect.height / 2;


        console.log("Mouse Down", lastPosX, " ", lastPosY);
        var pathString = "M" + firstPosX + "," + firstPosY + " L" + lastPosX + "," + lastPosY;
        path.setAttribute("d", pathString);

        svg.appendChild(path); // Draws the path

        drawnPaths.push(path);
        click = 0;
        console.log("current drawn paths: ", drawnPaths);

        connectedNodes.push(event.target);
        E.push(connectedNodes); 
        console.log("current edges set E = ", E);

        connectedNodes = [];
    }
    
   
}

function updateMouseDown(event) {
    isDragging = true;
}

function updateMouseDrag(event) {
    if (isDragging) {
        console.log("changing drawnPaths' locations...");
        updatePaths(event);
    }
}

// When the user moves their node, update the path's position
function updateMouseUp(event) {
    updatePaths(event);
    isDragging = false;
}


/*
updatePaths: Bit complicated but the main player of path drawing
- When the user drags a node with a connected path, we want to update the drawn path to 
represent the new location
- In E, i represents the paths, which we access its values from drawnPaths. j represents the nodes.
- We check E's paths and in it, check the paths' nodes, if they equate thus we know which paths 
the dragged node is connected to. 
- We check whether the node is at index j = 0
thus in SVG represents the first node we clicked (The node that has the M value) or if it's at j = 1
thus in SVG represents the second node (the one with L)
- we do string maniplulation to update the L or M correctly, essentially updating the path to 
the new location. Only works after confirming your path.
*/


function updatePaths(event) {
    for (let i = 0; i < E.length; i++) {
        for (let j = 0; j < E[i].length; j++) {
            if (E[i][j] === event.target) {
                if (j === 0) {
                    let currentDValue = drawnPaths[i].getAttribute("d");
                    let currentLValue = currentDValue.split("L")[1]; // Extracts L's current value

                    // gets the dragged node's center positions
                    var rect = event.target.getBoundingClientRect();
                    var centerX = rect.left + rect.width / 2;
                    var centerY = rect.top + rect.height / 2;

                    // M becomes the moving node's location
                    let newMValue = "" + centerX + "," + centerY; 
                    console.log("newMValue = ", newMValue);

                    // Updates the path into the correct location
                    drawnPaths[i].setAttribute("d", "M" + newMValue + " L" + currentLValue);
                } else {
                    let currentD = drawnPaths[i].getAttribute("d");
                    let currentM = currentD.split(" ")[0]; // Extracts M's current value

                    // gets the dragged node's center positions
                    var rect = event.target.getBoundingClientRect();
                    var centerX = rect.left + rect.width / 2;
                    var centerY = rect.top + rect.height / 2;

                    // L becomes the moving node's location
                    let newL = "" + centerX + "," + centerY ; 
                    console.log("newL = ", newL);

                    // Updates the path into the correct location
                    drawnPaths[i].setAttribute("d", "" + currentM + " L" + newL);
                }
            }
        }
    }
}



// Gets called if the checkbox is checked, enables path drawing
function draw() {
    console.log("drawing path...");
    console.log("drawingArea: ", drawingArea);
    console.log("existant graphs: ", graphs);
    graphs.forEach(function(item) {
        item.addEventListener("click", handleMouseDown);
    });
}

// Gets called if the checkbox is unchecked, disables path drawing
function confirm() {
    console.log("confirmed path!");
    graphs.forEach(function(item) {
        item.removeEventListener("click", handleMouseDown);
        item.addEventListener("mousedown", updateMouseDown);
        item.addEventListener("mousemove", updateMouseDrag);
        item.addEventListener("mouseup", updateMouseUp);
        
    }); 

}

function checkCheckbox() {
    var checkbox = document.getElementById('pathCheckbox');
    var label = document.getElementById("drawPathLabel");
    var textNode = label.childNodes[2];
    var oldTextContent;
    

    if (checkbox.checked) {
        draw();
        oldTextContent = textNode.textContent;
        if (graphType === "oriented") {
            textNode.textContent = "Confirmer Arc";
        } else {
            textNode.textContent = "Confirmer Arête";
        }
        
    } else {
        confirm(); 
        var textNode = label.childNodes[2];
        if (graphType === "oriented") {
            textNode.textContent = "Tracer Arc";
        } else {
            textNode.textContent = "Tracer Arête";
        }
        alert("Paths confirmed!");
    }
}
