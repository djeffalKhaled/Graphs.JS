modifysideBar = document.getElementById("ModifySideBar");
modifysideBar.style.visibility = "hidden";

function modifySideBar() {
    if (modifysideBar.style.visibility === "visible") {
        modifysideBar.style.visibility = "hidden";
    } else {
        modifysideBar.style.visibility = "visible";
    }
    
}

function graphValuesCheckBox() {    
    var checkbox = document.getElementById('valuesCheckBox');

    if (checkbox.checked) {
        graphs.forEach(function(item) {
            item.setAttribute("contenteditable", "true");
        });
    } else {
        graphs.forEach(function(item) {
            item.removeAttribute("contenteditable", "true");
        });
    }
}

