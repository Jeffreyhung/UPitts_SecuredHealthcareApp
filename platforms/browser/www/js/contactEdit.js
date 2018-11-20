var select = document.getElementById('weight_integer');
for (var i = 0; i<=400; i++){
	var opt = document.createElement('option');
	opt.value = i;
	opt.innerHTML = i;
	select.appendChild(opt);
}
select = document.getElementById('weight_decimal');
for (var i = 0; i<=9; i++){
	var opt = document.createElement('option');
	opt.value = i;
	opt.innerHTML = "."+i;
	select.appendChild(opt);
}
select = document.getElementById('height_ft');
for (var i = 0; i<=10; i++){
	var opt = document.createElement('option');
	opt.value = i;
	opt.innerHTML = i;
	select.appendChild(opt);
}
select = document.getElementById('height_int');
for (var i = 0; i<=11; i++){
	var opt = document.createElement('option');
	opt.value = i;
	opt.innerHTML = i;
	select.appendChild(opt);
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
	console.log("load success");
	var contact = JSON.parse(content);
	document.getElementById("name").value = contact.name;
	document.getElementById("dob").value = contact.dob;
	document.getElementById("blood_type").value = contact.blood_type;
	document.getElementById("weight_integer").value = contact.weight_integer;
	document.getElementById("weight_decimal").value = contact.weight_decimal;
	document.getElementById("height_ft").value = contact.height_ft;
	document.getElementById("height_int").value = contact.height_int;
	document.getElementById("allergies").value = contact.allergies;
	document.getElementById("contact_name").value = contact.contact_name;
	document.getElementById("contact_phone").value = contact.contact_phone;
}
function validate(){
	var name = document.getElementById('name').value;
	var dob = document.getElementById('dob').value;
	var blood_type = document.getElementById('blood_type').value;
	var weight_integer = document.getElementById('weight_integer').value;
	var weight_decimal = document.getElementById('weight_decimal').value;
	var height_ft = document.getElementById('height_ft').value;
	var height_int = document.getElementById('height_int').value;
	var allergies = document.getElementById('allergies').value;
	var contact_name = document.getElementById('contact_name').value;
	var contact_phone = document.getElementById('contact_phone').value;
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