var data, addData;

function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    PFS.getFile("medicalInfo", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("medicalInfo", PFS);
    document.getElementById("defaultMessage").style.display = 'none';
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
    decrypt = null;
    showData(medicalInfo);
    medicalInfo = null;
}

function showData(info) {
    var ul = document.getElementById("dataTable");
    var temp = "";
    for (i in info.data) {
        var li = document.createElement("li");
        var p = document.createElement("p");
        li.className = "table-view-cell";
        li.appendChild(document.createTextNode(info.data[i].date));

        temp = "Hospital : " + info.data[i].hospital;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = "Doctor : " + info.data[i].doctor;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = "Problem : " + info.data[i].problem;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = "Threatmeat : " + info.data[i].threatment;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = null;
        li.appendChild(p);
        ul.appendChild(li);
    }
    p, li, ul, temp = null;
}