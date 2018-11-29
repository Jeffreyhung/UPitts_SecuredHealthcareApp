function SBtrigger() {
    var sb = document.getElementById("Sidebar");
    if (sb.style.width == '150px') {
        document.getElementById("Sidebar").style.width = "0";
    } else {
        document.getElementById("Sidebar").style.width = "150px";
    }
}

function afterRPFS() {
    PFS.getFile("insurance", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("insurance", PFS);
}

function fileDoesNotExist() {
    location.replace("insuranceEdit.html");
}

function loadFileSuccess(filename, content) { //called when load file success
    console.log(content);
    var insurance = JSON.parse(content);
    document.getElementById("company").innerHTML = insurance.company;
    document.getElementById("phone").innerHTML = insurance.phone;
    document.getElementById("policy").innerHTML = insurance.policy;
    document.getElementById("copay").innerHTML = insurance.copay;
    document.getElementById("name").innerHTML = insurance.name;
    document.getElementById("memberId").innerHTML = insurance.memberId;
}