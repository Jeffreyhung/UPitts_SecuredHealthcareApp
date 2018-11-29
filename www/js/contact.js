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

function afterRPFS() { // called after persistent file system loaded, check if contact file exist
    PFS.getFile("contact", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("contact", PFS);
}

function fileDoesNotExist() {
    location.replace("contactEdit.html");
}

function loadFileSuccess(filename, content) { //called when load file success
    var contact = JSON.parse(content);
    document.getElementById("name").innerHTML = contact.name;
    document.getElementById("dob").innerHTML = contact.dob;
    document.getElementById("blood_type").innerHTML = contact.blood_type;
    document.getElementById("weight").innerHTML = contact.weight_integer + '.' + contact.weight_decimal + ' lbs';
    document.getElementById("height").innerHTML = contact.height_ft + ' \' ' + contact.height_int + ' \"';
    document.getElementById("allergies").innerHTML = contact.allergies;
    document.getElementById("contact_name").innerHTML = contact.contact_name;
    document.getElementById("contact_phone").innerHTML = contact.contact_phone;
}
