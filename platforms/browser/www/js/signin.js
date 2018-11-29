var userinfo, hashresult;

function showPW() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function afterRPFS() {
    requestTFS();
}

function afterRTFS() {
    loadFile("userinfo", PFS);
}

function loadFileSuccess(filename, content) { //called when load file success
    userinfo = JSON.parse(content);
    console.log(userinfo);
    document.getElementById("email").placeholder = "Email: " + userinfo.email;
}

function submit() {
    hash(document.getElementById('password').value, userinfo.email);
}

function hash(password, somesalt) {
    var hashresult;
    argon2.hash({ pass: password, salt: somesalt })
        .then(h => {
            hashresult = h.hashHex;
            login(hashresult);
        })
        .catch(e => console.error(e.message, e.code))
}

function login(hashresult) {
    if (hashresult == userinfo.password) {
        saveTemporaryFile("session", hashresult, TFS);
    } else {
        alert("Password incorrect!")
    }
}

function saveTemporaryFileSuccess() {
    location.replace("home.html");
}