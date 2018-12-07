var data, addData;

function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    PFS.getFile("medicationInfo", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("medicationInfo", PFS);
    document.getElementById("defaultMessage").style.display = 'none';
}

function fileDoesNotExist() {
    document.getElementById("defaultMessage").style.display = 'block';
}

function loadFileSuccess(filename, content) { //called when load file success
    data = content;
    loadSession(loadSessionSuccess);
}

function loadSessionSuccess(content) {
    var decrypted = CryptoJS.AES.decrypt(data, content);
    content = null;
    var medicationInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    decrypt = null;
    showData(medicationInfo);
    medicationInfo = null;
}

function showData(info) {
    var ul = document.getElementById("dataTable");
    var temp = "";
    for (i in info.data) {
        var li = document.createElement("li");
        var p = document.createElement("p");
        li.className = "table-view-cell";
        li.appendChild(document.createTextNode(info.data[i].medicine));

        temp = "Dosage : " + info.data[i].dosage;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = "Frequency : " + info.data[i].frequency;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = "Time : " + info.data[i].startDate + " ~ " + info.data[i].endDate;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = "Note : " + info.data[i].note;
        p.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
        p.appendChild(document.createTextNode(temp));
        p.appendChild(document.createElement("br"));
        temp = null;
        li.appendChild(p);
        ul.appendChild(li);
    }
    p, li, ul, temp = null;
}