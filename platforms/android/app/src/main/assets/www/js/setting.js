var backupData = {};
var session = null;

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

function download() {
    requestPFS();
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
    loadFile("medicalInfo", PFS, loadOneSuccess);
    loadFile("medicationInfo", PFS);
    loadFile("insurance", PFS);
}

function loadOneSuccess(){
    loadFile("medicationInfo", PFS, loadTwoSuccess);
}

function loadTwoSuccess(){
    loadFile("insurance", PFS, loadThreeSuccess);
}

function loadThreeSuccess(){
    var StringData = JSON.stringify(backupData);
    console.log(StringData);
    console.log(backupData);
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
    console.log("callback function");
    alert("Backup completed!")
}

function scope() {
    alert("Something's wrong, please try again later")
}