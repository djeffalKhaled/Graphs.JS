aboutsideBar = document.getElementById("AboutSideBar");
aboutsideBar.style.visibility = "hidden";


function aboutSideBar() {
    if (aboutsideBar.style.visibility === "visible") {
        aboutsideBar.style.visibility = "hidden";
    } else {
        aboutsideBar.style.visibility = "visible";
    }
    
}