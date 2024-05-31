// Depricated
function save() {
    var htmlContent = document.documentElement.outerHTML;
    console.log(htmlContent);
    localStorage.setItem('savedHTML', htmlContent);
    alert('Graph content saved!', htmlContent);
}

function load() {
    
    var savedHTML = localStorage.getItem('savedHTML');
    alert("attempting to load", savedHTML);
    if (savedHTML) {
        document.documentElement.innerHTML = savedHTML;

        let loadedGraphs = document.querySelectorAll('#graph');
        let loadedPaths = document.querySelectorAll('#path');
        graphs = [...loadedGraphs];
        drawnPaths = [...loadedPaths];

        console.log("loaded graphs: ", graphs);
        console.log("loaded paths: ", drawnPaths);

        graphs.forEach((item) => {
            makeDraggable(item);
        })
        

        alert('HTML content loaded successfully!');
    } else {
        alert('No saved HTML found!');
    }
}