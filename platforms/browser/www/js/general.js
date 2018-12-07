function SBtrigger() {
    var sb = document.getElementById("Sidebar");
    if (sb.style.width == '150px') {
        document.getElementById("Sidebar").style.width = "0";
    } else {
        document.getElementById("Sidebar").style.width = "150px";
    }
}