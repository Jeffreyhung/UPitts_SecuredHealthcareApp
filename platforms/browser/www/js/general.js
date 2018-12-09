window.onload = function() {
    document.addEventListener("deviceready", requestTFS, false)
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

function SBtrigger() {
    var sb = document.getElementById("Sidebar");
    if (sb.style.width == '150px') {
        document.getElementById("Sidebar").style.width = "0";
    } else {
        document.getElementById("Sidebar").style.width = "150px";
    }
}

function afterRTFS() {
    requestPFS();
}

function afterRPFS() {
    TFS.getFile("session", { create: false }, sessionExists, sessionDoesNotExist);
}

function onPause() {
    deleteFile("session", TFS);
}

function onResume() {
    window.location = 'signin.html';
}

function sessionExists() {
    PFS.getFile("userinfo", { create: false }, userinfoExists, userinfoDoesNotExist);
}

function sessionDoesNotExist() {
    window.location = 'signin.html';
}

function userinfoDoesNotExist() {
    window.location = 'signup.html';
}