var sessionKey, data;

function SBtrigger() {
    var sb = document.getElementById("Sidebar");
    if (sb.style.width == '150px') {
        document.getElementById("Sidebar").style.width = "0";
    } else {
        document.getElementById("Sidebar").style.width = "150px";
    }
}

function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    PFS.getFile("insurance", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("insurance", PFS);
}

function fileDoesNotExist() {
    location.replace("insuranceEdit.html");
}

function loadFileSuccess(filename, content) { //called when load file success
    data = content;
    loadSession(decryption);
}

function decryption(session) {
    var decrypted = CryptoJS.AES.decrypt(data, session);
    session = null;
    var insurance = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    document.getElementById("company").innerHTML = insurance.company;
    document.getElementById("phone").innerHTML = insurance.phone;
    document.getElementById("policy").innerHTML = insurance.policy;
    document.getElementById("copay").innerHTML = insurance.copay;
    document.getElementById("name").innerHTML = insurance.name;
    document.getElementById("memberId").innerHTML = insurance.memberId;
}