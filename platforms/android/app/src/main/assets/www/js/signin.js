var userinfo, hashresult, hashresult2;

window.onload = function() {
    requestTFS();
}

function showPW() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

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
    argon2.hash({ pass: password, salt: somesalt })
        .then(h => {
            hashresult = h.hashHex;
            hash2(hashresult, userinfo.email);
        })
        .catch(e => console.error(e.message, e.code))
}

function hash2(password2, somesalt2) {
    argon2.hash({ pass: password2, salt: somesalt2 })
        .then(h => {
            hashresult2 = h.hashHex;
            login(hashresult2);
        })
        .catch(e => console.error(e.message, e.code))
}

function login(hashresult) {
    if (hashresult2 == userinfo.password) {
        saveTemporaryFile("session", hashresult, TFS);
    } else {
        alert("Password incorrect!")
    }
}

function saveTemporaryFileSuccess() {
    hashresult,
    hashresult2,
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