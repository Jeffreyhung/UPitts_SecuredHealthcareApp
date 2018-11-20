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
	console.log("load success");
	var insurance = JSON.parse(content);
	document.getElementById("company").value = insurance.company;
	document.getElementById("phone").value = insurance.phone;
	document.getElementById("policy").value = insurance.policy;
	document.getElementById("copay").value = insurance.copay;
	document.getElementById("name").value = insurance.name;
	document.getElementById("memberId").value = insurance.memberId;
}
function validate(){
	var company = document.getElementById("company").value;
	var phone = document.getElementById("phone").value;
	var policy = document.getElementById("policy").value;
	var copay = document.getElementById("copay").value;
	car name = document.getElementById("name").value;
	var memberId = document.getElementById("memberId").value;
	if(!validateStictInput(name)){
		alert("Name included invalid characters");
		return;
	}else if(!validateDate(dob)){
		alert("Date of Birth included invalid characters");
		return;
	}else if(!validateInput(blood_type)){
		alert("Blood Type included invalid characters");
		return;
	}else if(!validateNumbers(weight_integer)){
		alert("Weight included invalid characters");
		return;
	}else if(!validateNumbers(weight_decimal)){
		alert("Weight included invalid characters");
		return;
	}else if(!validateNumbers(height_ft)){
		alert("Height included invalid characters");
		return;
	}else if(!validateNumbers(height_int)){
		alert("Height included invalid characters");
		return;
	}else if(!validateInput(allergies)){
		alert("Allergies included invalid characters");
		return;
	}else if(!validateStictInput(contact_name)){
		alert("Contact Name included invalid characters");
		return;
	}else if(!validatePhone(contact_phone)){
		alert("Contact Phone included invalid characters");
		return;
	}else {
		save(name, dob, blood_type, weight_integer, weight_decimal, height_ft, height_int, allergies, contact_name, contact_phone);
	}
}
	
function save(name, dob, blood_type, weight_integer, weight_decimal, height_ft, height_int, allergies, contact_name, contact_phone){
	var contactinfo;
	contactinfo = '{ "name":"'+ name +
				'" , "dob":"' + dob + 
				'" , "blood_type":"' + blood_type + 
				'" , "weight_integer":"' + weight_integer + 
				'" , "weight_decimal":"' + weight_decimal + 
				'" , "height_ft":"' + height_ft + 
				'" , "height_int":"' + height_int + 
				'" , "allergies":"' + allergies + 
				'" , "contact_name":"' + contact_name + 
				'" , "contact_phone":"' + contact_phone + 
				'"}';
	console.log(contactinfo);
	saveFile("contact", contactinfo);
}
function saveFileSuccess(filename) { // called when saved file success 
	//console.log("saveFileSuccess");
	//listFiles();
	//loadFile(filename);	
	location.replace("contact.html");				
}
function loadFileSuccess(filename, content) { //called when load file success
	//console.log(content);
}