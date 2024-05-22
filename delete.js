var checkbox = document.getElementById('deleteCheckbox');

function handleDeletion(e) {
    if (checkbox.checked) {
        var element = e.target; // Get the clicked element
        console.log(e.target);
        console.log(e.id);
        if (element.className === "graph") {
            console.log("graphs pre deletion:", graphs);
            var index = graphs.indexOf(element);
            if (index !== -1) {
                graphs.splice(index, 1); // pops the element from the array
            }
            
            element.remove(); 
            console.log("deleted: ", element);
            console.log("Total graphs left:", graphs);
        }
        else if (element.id  == "/^path\d+$/") {
            console.log("WITHIN!!!!!!!!!");
            var index = drawnPaths.indexOf(element);
            if (index !== -1) {
                drawnPaths.splice(index, 1); // pops the element from the array
            }

            element.remove();
            console.log("deleted: ", element);
            console.log("Total paths left:", drawnPaths);
        }
    }
}

function deleteElem() {
    if (checkbox.checked) {
        console.log("deleting...");
        document.addEventListener('click', handleDeletion);
    } else {
        console.log("finished deleting!");
        document.removeEventListener('click', handleDeletion);
    }
}