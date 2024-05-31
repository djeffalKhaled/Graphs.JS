var typeClick = 0;
const graphTypeLabel = document.getElementById("graphTypeLabel");
const drawPathLabel = document.getElementById("drawPathLabel");

var graphType = "oriented";

function defineType() {
    typeClick++;
    if (typeClick === 1) {
        console.log("Oriented Graph");
        graphType = "oriented";
        graphTypeLabel.childNodes[2].textContent = "Orienté";
        drawPathLabel.childNodes[2].textContent = "Tracer Arc";
    }
    else if (typeClick === 2) {
        console.log("Non-oriented Graph");
        graphType = "nonoriented"
        graphTypeLabel.childNodes[2].textContent = "Non-orienté";
        drawPathLabel.childNodes[2].textContent = "Tracer Arête";
        typeClick = 0;
    }
}