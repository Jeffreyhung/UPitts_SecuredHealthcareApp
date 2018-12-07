var data, addData, parsedInfo;
var medicalInfo = { "data": [] };

function revisitShow(choice) {
    if (choice == '1') {
        document.getElementById("revisitDate").style.display = 'block';
    } else {
        document.getElementById("revisitDate").style.display = 'none';
    }
}

function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    PFS.getFile("medicalInfo", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("medicalInfo", PFS);
}

function fileDoesNotExist() {}

function loadFileSuccess(filename, content) {
    data = content;
    loadSession(loadSessionSuccess);
}

function loadSessionSuccess(content) {
    var decrypted = CryptoJS.AES.decrypt(data, content);
    content = null;
    medicalInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

function validate() {
    var date = document.getElementById("date").value;
    var hospital = document.getElementById("hospital").value;
    var doctor = document.getElementById("doctor").value;
    var problem = document.getElementById("problem").value;
    var threatment = document.getElementById("threatment").value;
    var revisit = document.getElementById("revisit").value;
    var revisitDate = document.getElementById("revisitDateValue").value;
    if (!validateDate(date)) {
        alert("Date included invalid characters");
        return;
    } else if (!validateInput(hospital)) {
        alert("Hospital included invalid characters");
        return;
    } else if (!validateStictInput(doctor)) {
        alert("Doctor included invalid characters");
        return;
    } else if (!validateInput(problem)) {
        alert("Problem included invalid characters");
        return;
    } else if (!validateStictInput(threatment)) {
        alert("Threatment included invalid characters");
        return;
    } else if (!validateNumbers(revisit)) {
        alert("Revisit included invalid characters");
        return;
    } else if (!validateDate(revisitDate)) {
        alert("Revisit Date included invalid characters");
        return;
    } else {
        complie(date, hospital, doctor, problem, threatment, revisit, revisitDate);
    }
}

function complie(date, hospital, doctor, problem, threatment, revisit, revisitDate) {
    addData = { "date": date, "hospital": hospital, "doctor": doctor, "problem": problem, "threatment": threatment, "revisit": revisit, "revisitDate": revisitDate };
    medicalInfo['data'].push(addData);
    addData = null;
    parsedInfo = JSON.stringify(medicalInfo);
    medicalInfo = null;
    loadSession(encrypt);
}

function encrypt(content) {
    var encryptedData = CryptoJS.AES.encrypt(parsedInfo, content);
    content = null;
    savePersistentFile("medicalInfo", encryptedData);
    encryptedData, parsedInfo = null;
}

function savePersistentFileSuccess(filename) {
    location.replace("home.html");
}