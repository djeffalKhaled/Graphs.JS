var graphs = []

var draggedGraph;


// Handles dragging of graphs 
function makeDraggable(element) {
    let offsetX, offsetY;
    let isDragging = false;

    // When the user pressed down the mouse
    function handleMouseDown(event) {
        isDragging = true;
        const rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        element.style.backgroundColor = 'lightgreen';
    }

    // When the user moves the mouse
    function handleMouseMove(event) {
        if (isDragging) {
            element.style.left = event.clientX - offsetX + 'px';
            element.style.top = event.clientY - offsetY + 'px';
        }
    }

    // When the user exits the mouse
    function handleMouseUp(event) {
        isDragging = false;
        element.style.backgroundColor = 'white';
    }

    // Main event listeners attachements
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Assures cleanup once we remove the graph
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.removedNodes && Array.from(mutation.removedNodes).includes(element)) {
                document.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                observer.disconnect();
            }
        });
    });
}


const insertButton = document.getElementById("insertButton"); 

insertButton.addEventListener("click", (e) => {
    
    let newGraph = document.createElement("div");
    newGraph.id = "graph" + graphs.length;
    newGraph.classList.add("graph");
    newGraph.textContent = "" + graphs.length;
    newGraph.style.position = "absolute";
    newGraph.style.top = "10px";
    newGraph.style.left = "10px";
    
    makeDraggable(newGraph);

    graphs.push(newGraph);
    console.log("created new graph: ", newGraph);
    console.log("Total graphs: ", graphs.length);
    
    document.body.appendChild(newGraph);
});


// Paths

