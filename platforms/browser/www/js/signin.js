var userinfo;

window.onload = function() {
    document.addEventListener("deviceready", requestTFS, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function showPW() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function onBackKeyDown() {}

function afterRTFS() {
    requestPFS();
}

function afterRPFS() {
    loadFile("userinfo", PFS);
    PFS.getFile("contact", { create: false }, fileExists, fileDoesNotExist);
}

function loadFileSuccess(filename, content) {
    userinfo = JSON.parse(content);
    document.getElementById("email").placeholder = "Email: " + userinfo.email;
}

function submit() {
    hash1(document.getElementById('password').value, userinfo.email);
}

function hash1(password, somesalt) {
    var hashresult = CryptoJS.SHA256(password + somesalt);
    hashresult = hashresult.toString();
    hash2(hashresult, userinfo.email);
}

function hash2(password2, somesalt2) {
    var hashresult2 = CryptoJS.SHA256(password2 + somesalt2);
    hashresult2 = hashresult2.toString();
    password2, somesalt2 = null;
    login(hashresult2);
}

function login(hashresult) {
    if (hashresult == userinfo.password) {
        saveTemporaryFile("session", hashresult, TFS);
    } else {
        alert("Password incorrect!")
    }
}

function saveTemporaryFileSuccess() {
    userinfo,
    password,
    somesalt = null;
    location.replace("home.html");
}

function fileExists() {
    document.getElementById("emergency").style.display = 'block';
}

function fileDoesNotExist() {
    document.getElementById("emergency").style.display = 'none';
}