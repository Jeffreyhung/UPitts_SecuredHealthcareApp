function validateEmail(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}
function validatePassword(pass) {
	var regex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	return regex.test(pass);
}
function validateStictInput(words) {
	var regex = /^[_A-z0-9]+((-|\s)*[._A-z0-9])*$/;
	return regex.test(words)
}
function validateInput(words) {
	var regex = /^[_A-z0-9]+((-|\s)*[_A-z0-9])*$/;
	return regex.test(words)
}
function validateNumbers(numbers) {
	var regex = /^[0-9]+$/;
	return regex.test(numbers)
}
function validateDate(date) {
	var regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
	return regex.test(date)
}
function validatePhone(phone) {
	var regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}$/;
	return regex.test(phone);
}
