var filesystem = null;
var dirEntry = null;	//DirectoryEntry
//check if filesystem is supported
function requestFS() {
	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	if (window.requestFileSystem) {
		initFileSystem(); // call initFileSystem if supported
	} else {
		alert("Sorry! Your browser doesn\'t support the FileSystem API");
	}
}
function initFileSystem() { //initial FileSystem
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 5 /* 5MB */, function(fs) {
		filesystem = fs;	//init filesystem
		dirEntry = fs.root;	//init entry directory
		onLoadFunction();	//call after initFileSystem
	}, errorHandler);
}
function setDirectory(dir) {  //set directory
	filesystem.root.getDirectory(dir, {create: true}, function(entry) {
		dirEntry = entry;	//set directory
		afterSetDirectory();	//called after setDirectory
	}, errorHandler);
}
function saveFile(filename, content) {  //save file
	dirEntry.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.onwriteend = function(e) {
				saveFileSuccess(filename);	//called after saveFile
			};
			fileWriter.onerror = function(e) {	//error
				console.log('Write error: ' + e.toString());
				alert('Unable to save file');
			};
			fileWriter.write(content);	//start writing
		}, errorHandler);
	}, errorHandler);
}
function loadFile(filename) { // read file
	dirEntry.getFile(filename, {}, function(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onload = function(e) {
				loadFileSuccess(filename, this.result);	//called after loadFile
			};
			reader.readAsText(file);
		}, errorHandler);
	}, errorHandler);
}
function deleteFile(filename) { //delete file
	dirEntry.getFile(filename, {create: false}, function(fileEntry) {
		fileEntry.remove(function(e) {
			deleteFileSuccess();	//called after deletefile
		}, errorHandler);
	}, errorHandler);
}
function listFiles() {// list filesa
	var dirReader = dirEntry.createReader();
	var entries = [];
 
	var fetchEntries = function() {
		dirReader.readEntries(function(results) {
			if (!results.length) {	//finish reading
				displayEntries(entries);	//called after listFiles returns Entry array
			} else {
				entries = entries.concat(results);
				fetchEntries();	//read next item
			}
		}, errorHandler);
	};
 
	fetchEntries();
}

function errorHandler(error) {
	var message = '';
 
	switch (error.code) {
		case FileError.SECURITY_ERR:
			message = 'Security Error';
			break;
		case FileError.NOT_FOUND_ERR:
			message = 'Not Found Error';
			break;
		case FileError.QUOTA_EXCEEDED_ERR:
			message = 'Quota Exceeded Error';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			message = 'Invalid Modification Error';
			break;
		case FileError.INVALID_STATE_ERR:
			message = 'Invalid State Error';
			break;
		default:
			message = 'Unknown Error';
			break;
	}
	console.log(message);
}