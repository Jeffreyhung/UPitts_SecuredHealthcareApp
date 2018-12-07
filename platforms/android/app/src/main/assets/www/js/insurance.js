var sessionKey, data;

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

function loadFileSuccess(filename, content) {
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