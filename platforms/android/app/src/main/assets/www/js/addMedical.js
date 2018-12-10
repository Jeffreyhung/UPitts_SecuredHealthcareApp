var data, addData, parsedInfo;
var medicalInfo = { "data": [] };

function revisitShow(choice) {
    if (choice == '1') {
        document.getElementById("revisitDate").style.display = 'block';
    } else {
        document.getElementById("revisitDate").style.display = 'none';
    }
}

function userinfoExists() {
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

function loadSessionSuccess(session) {
    var decrypted = CryptoJS.AES.decrypt(data, session);
    session = null;
    medicalInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

function deleteFileSuccess() {}

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

function savePersistentFile(filename, content) {
    PFS.getFile(filename, { create: true, exclusive: false }, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                savePersistentFileSuccess(filename);
            };
            fileWriter.onerror = function(e) {
                console.log('Write error: ' + e.toString());
                alert('Unable to save file');
            };
            fileWriter.write(content);
        }, errorHandler);
    }, errorHandler);
}

function encrypt(session) {
    var encryptedData = CryptoJS.AES.encrypt(parsedInfo, session);
    session = null;
    savePersistentFile("medicalInfo", encryptedData.toString());
    encryptedData, parsedInfo = null;
}

function savePersistentFileSuccess(filename) {
    // alert("write success");
    location.replace("home.html");
}