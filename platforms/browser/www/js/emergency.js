window.onload = function() {
    document.addEventListener("deviceready", requestPFS, false);
}

function afterRPFS() {
    PFS.getFile("contact", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("contact", PFS);
}

function fileDoesNotExist() {
    location.replace("signin.html");
}

function loadFileSuccess(filename, content) {
    var contact = JSON.parse(content);
    document.getElementById("name").innerHTML = contact.name;
    document.getElementById("dob").innerHTML = contact.dob;
    document.getElementById("blood_type").innerHTML = contact.blood_type;
    document.getElementById("weight").innerHTML = contact.weight_integer + '.' + contact.weight_decimal + ' lbs';
    document.getElementById("height").innerHTML = contact.height_ft + ' \' ' + contact.height_int + ' \"';
    document.getElementById("allergies").innerHTML = contact.allergies;
    document.getElementById("contact_name").innerHTML = contact.contact_name;
    document.getElementById("contact_phone").innerHTML = contact.contact_phone;
    contact = null;
}