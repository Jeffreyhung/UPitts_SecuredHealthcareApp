var insurnaceInfo, sessionKey, data;

function userinfoExists() {
    PFS.getFile("insurance", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("insurance", PFS);}

function fileDoesNotExist() { }


function loadFileSuccess(filename, content) {
    data = content;
    loadSession(loadSessionSuccess);
}

function loadSessionSuccess(content){
    var decrypted = CryptoJS.AES.decrypt(data, content);
    content=null;
    var insurance = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    document.getElementById("company").value = insurance.company;
    document.getElementById("phone").value = insurance.phone;
    document.getElementById("policy").value = insurance.policy;
    document.getElementById("copay").value = insurance.copay;
    document.getElementById("name").value = insurance.name;
    document.getElementById("memberId").value = insurance.memberId;
    insurance=null;
}

function validate() {
    var company = document.getElementById("company").value;
    var phone = document.getElementById("phone").value;
    var policy = document.getElementById("policy").value;
    var copay = document.getElementById("copay").value;
    var name = document.getElementById("name").value;
    var memberId = document.getElementById("memberId").value;
    if (!validateInput(company)) {
        alert("Company included invalid characters");
        return;
    } else if (!validatePhone(phone)) {
        alert("Phone included invalid characters");
        return;
    } else if (!validateInput(policy)) {
        alert("Policy included invalid characters");
        return;
    } else if (!validateInput(copay)) {
        alert("Copay included invalid characters");
        return;
    } else if (!validateStictInput(name)) {
        alert("Name included invalid characters");
        return;
    } else if (!validateInput(memberId)) {
        alert("Member ID included invalid characters");
        return;
    } else {
        complie(company, phone, policy, copay, name, memberId);
    }
}

function complie(company, phone, policy, copay, name, memberId) {
    insurnaceInfo = '{ "company":"' + company +
        '" , "phone":"' + phone +
        '" , "policy":"' + policy +
        '" , "copay":"' + copay +
        '" , "name":"' + name +
        '" , "memberId":"' + memberId +
        '"}';
    loadSession(encrypt);
}

function encrypt(content) {
    var encryptedData = CryptoJS.AES.encrypt(insurnaceInfo, content);
    content = null;
    savePersistentFile("insurance", encryptedData);
    encryptedData, insurnaceInfo, company, phone, policy, copay, name, memberId = null;
}

function savePersistentFileSuccess(filename) {
    location.replace("insurance.html");
}