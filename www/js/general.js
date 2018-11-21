function SBtrigger() {
	var sb = document.getElementById("Sidebar");
	if (sb.style.width == '150px') {
		document.getElementById("Sidebar").style.width = "0";
		//document.getElementById("main").style.marginLeft= "0";
	} else {
		document.getElementById("Sidebar").style.width = "150px";
		//document.getElementById("main").style.marginLeft = "150px";
	}
}
