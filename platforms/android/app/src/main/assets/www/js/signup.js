 var userinfo, hashresult;

 function showPW() {
     var x = document.getElementById("password");
     if (x.type === "password") {
         x.type = "text";
     } else {
         x.type = "password";
     }
 }

 var userInput = document.getElementById("password");
 var letter = document.getElementById("letter");
 var capital = document.getElementById("capital");
 var number = document.getElementById("number");
 var length = document.getElementById("length");
 var symbol = document.getElementById("special");

 // When the user clicks on the password field, show the message box
 userInput.onfocus = function() {
     document.getElementById("message").style.display = "block";
 }

 // When the user clicks outside of the password field, hide the message box
 userInput.onblur = function() {
     document.getElementById("message").style.display = "none";
 }

 function disableSubmit() {
     document.getElementById("submitButton").classList.add("disabled");
 }

 function enableSubmit() {
     document.getElementById("submitButton").classList.remove("disabled");
 }

 userInput.onkeyup = function() {
     // Validate lowercase letters
     var lowerCaseLetters = /[a-z]/g;
     if (userInput.value.match(lowerCaseLetters)) {
         letter.classList.remove("invalid");
         letter.classList.add("valid");
         enableSubmit();
     } else {
         letter.classList.remove("valid");
         letter.classList.add("invalid");
         disableSubmit();
     }

     // Validate capital letters
     var upperCaseLetters = /[A-Z]/g;
     if (userInput.value.match(upperCaseLetters)) {
         capital.classList.remove("invalid");
         capital.classList.add("valid");
         enableSubmit();
     } else {
         capital.classList.remove("valid");
         capital.classList.add("invalid");
         disableSubmit();
     }

     // Validate numbers
     var numbers = /[0-9]/g;
     if (userInput.value.match(numbers)) {
         number.classList.remove("invalid");
         number.classList.add("valid");
         enableSubmit();
     } else {
         number.classList.remove("valid");
         number.classList.add("invalid");
         disableSubmit();
     }

     // Validate special characters
     var special = /[!@#\$%\^&\*]/g;
     if (userInput.value.match(special)) {
         symbol.classList.remove("invalid");
         symbol.classList.add("valid");
         enableSubmit();
     } else {
         symbol.classList.remove("valid");
         symbol.classList.add("invalid");
         disableSubmit();
     }
     // Validate length
     if (userInput.value.length >= 8) {
         length.classList.remove("invalid");
         length.classList.add("valid");
         enableSubmit();
     } else {
         length.classList.remove("valid");
         length.classList.add("invalid");
         disableSubmit();
     }
 }

 function afterRPFS() {
     requestTFS();
 }

 function afterRTFS() {}

 function submit() {
     hash(document.getElementById('password').value, document.getElementById('email').value);
 }

 function hash(password, somesalt) {
     argon2.hash({ pass: password, salt: somesalt })
         .then(h => {
             hashresult = h.hashHex;
             userinfo = '{ "email":"' + somesalt + '" , "password":"' + hashresult + '"}';
             savePersistentFile("userinfo", userinfo, PFS);
         })
         .catch(e => console.error(e.message, e.code))
 }

 function savePersistentFileSuccess() {
     saveTemporaryFile("session", hashresult, TFS);
 }

 function saveTemporaryFileSuccess() {
     location.replace("home.html");
 }