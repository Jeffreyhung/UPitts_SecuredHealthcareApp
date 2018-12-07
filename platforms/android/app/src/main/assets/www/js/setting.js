var backupData = {};
var session = null;

function deletefile(){
    var repley = confirm("By doing this, you will delete all the data saved in the app. Are you sure you want to delete them?");
    if(repley ==true) {
        window.location = 'delete.html';
    }else{}
}

function download() {
    var repley = confirm("These files include your sensitive data that need to be taken carefully! Are you sure you want to download?");
    if (repley == true) {
        requestPFS();
    } else {}
}

function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    loadSession(afterSession);
}

function loadFile(filename, fsDir, callFunction) {
    fsDir.getFile(filename, {}, function(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // loadFileSuccess(filename, this.result); //called after loadFile
                var decrypted = CryptoJS.AES.decrypt(this.result, session);
                var data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                decrypted = null;
                backupData[filename] = data;
                data = null;
                callFunction();
            };
            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
}

function afterSession(content) {
    session = content;
    content = null;
    loadFile("medicalInfo", PFS, loadOneSuccess);
    loadFile("medicationInfo", PFS);
    loadFile("insurance", PFS);
}

function loadOneSuccess() {
    loadFile("medicationInfo", PFS, loadTwoSuccess);
}

function loadTwoSuccess() {
    loadFile("insurance", PFS, loadThreeSuccess);
}

function loadThreeSuccess() {
    var StringData = JSON.stringify(backupData);
    session, backupData = null;
    cordova.plugins.email.isAvailable(
        function(isAvailable) {
            if (isAvailable) {
                window.plugin.email.open({
                    subject: 'Backup data of Secured Health App',
                    body: StringData
                }, callback, scope);
            }
        }
    );
}

function callback() {
    StringData = null;
    alert("Backup completed!")
}

function scope() {
    alert("Something's wrong, please try again later")
}