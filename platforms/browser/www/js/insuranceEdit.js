var insuranceInfo;

function afterRPFS() {
	requestTFS();
}

function afterRTFS(){
    PFS.getFile("insurance", { create: false }, fileExists, fileDoesNotExist);
}

function fileExists(fileEntry) {
    loadFile("insurance", PFS);
}

function fileDoesNotExist() {
    console.log("no file found");
}

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

function loadFileSuccess(filename, content) { //called when load file success
    var insurance = JSON.parse(content);
	console.log(insurance);
    document.getElementById("company").value = insurance.company;
    document.getElementById("phone").value = insurance.phone;
    document.getElementById("policy").value = insurance.policy;
    document.getElementById("copay").value = insurance.copay;
    document.getElementById("name").value = insurance.name;
    document.getElementById("memberId").value = insurance.memberId;
}

function validate() {
    var company = document.getElementById("company").value;
    var phone = document.getElementById("phone").value;
    var policy = document.getElementById("policy").value;
    var copay = document.getElementById("copay").value;
    var name = document.getElementById("name").value;
    var memberId = document.getElementById("memberId").value;
    if (!validateInput(company)) {
        alert("Company included invalid characters");
        return;
    } else if (!validatePhone(phone)) {
        alert("Phone included invalid characters");
        return;
    } else if (!validateInput(policy)) {
        alert("Policy included invalid characters");
        return;
    } else if (!validateInput(copay)) {
        alert("Copay included invalid characters");
        return;
    } else if (!validateStictInput(name)) {
        alert("Name included invalid characters");
        return;
    } else if (!validateInput(memberId)) {
        alert("Member ID included invalid characters");
        return;
    } else {
        save(company, phone, policy, copay, name, memberId);
    }
}

function save(company, phone, policy, copay, name, memberId) {
    var insurnaceInfo;
    insurnaceInfo = '{ "company":"' + company +
        '" , "phone":"' + phone +
        '" , "policy":"' + policy +
        '" , "copay":"' + copay +
        '" , "name":"' + name +
        '" , "memberId":"' + memberId +
        '"}';
    savePersistentFile("insurance", insurnaceInfo);
}

function savePersistentFileSuccess(filename) {
    location.replace("insurance.html");
}