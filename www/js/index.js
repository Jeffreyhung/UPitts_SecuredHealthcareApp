window.onload = function() {
    document.addEventListener("deviceready", requestPFS, false);
}

function afterRPFS() {
    PFS.getFile("userinfo", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    location.replace("signin.html");
}

function fileDoesNotExist() {
    location.replace("signup.html");
}