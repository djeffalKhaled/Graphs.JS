sideBar = document.getElementById("AlgoSideBar");
sideBar.style.visibility = "hidden";

function algoSideBar() {
    if (sideBar.style.visibility === "visible") {
        sideBar.style.visibility = "hidden";
    } else {
        sideBar.style.visibility = "visible";
    }
    
}