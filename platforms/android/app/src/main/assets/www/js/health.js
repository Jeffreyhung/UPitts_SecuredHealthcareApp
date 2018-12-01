var data, addData;
function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    PFS.getFile("medicalInfo", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("medicalInfo", PFS);
    document.getElementById("defaultMessage").style.display = 'block';
}

function fileDoesNotExist() {
    document.getElementById("defaultMessage").style.display = 'block';
}

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

function loadFileSuccess(filename, content) { //called when load file success
    data = content;
    loadSession(loadSessionSuccess);
}

function loadSessionSuccess(content) {
    var decrypted = CryptoJS.AES.decrypt(data, content);
    content = null;
    var medicalInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    decrypt=null;
    console.log(medicalInfo);
    showData(medicalInfo);
}

function showData(info) {
    var ul = document.getElementById("dataTable");
    for (i in info.data) {
        console.log(info.data[i]);
        var li = document.createElement("li");
        li.className  = "table-view-cell";
        li.appendChild(document.createTextNode(info.data[i]));
        ul.appendChild(li);
    }
}