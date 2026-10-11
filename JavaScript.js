function DarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode")
}
function openBar() {
    document.getElementById("bar").innerHTML = "&#10006;";
    if (document.getElementById("Sidebar").style.width === "250px") {
        document.getElementById("bar").innerHTML = "&#9776;";
        closeBar();
    } else {
        document.getElementById("Sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
}

function closeBar() {
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";

}
