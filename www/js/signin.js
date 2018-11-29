var userinfo, hashresult, hashresult2;

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

function hash2(password, somesalt) {
    argon2.hash({ pass: password, salt: somesalt })
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