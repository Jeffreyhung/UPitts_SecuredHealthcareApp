var PFS = null;
var TFS = null;
//Request Persistent File System
function requestPFS() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        //window.requestFileSystem(PERSISTENT, 0, function(fs) {
        PFS = fs.root;
        afterRPFS(); //call after initFileSystem
    }, errorHandler);
}
//Request TEMPORARY File System
function requestTFS() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        // window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, function(fs) {
        TFS = fs.root;
        afterRTFS(); //call after initFileSystem
    }, errorHandler);
}
//set directory
function setDirectory(dir) {
    filesystem.root.getDirectory(dir, { create: true }, function(entry) {
        dirEntry = entry;
        afterSetDirectory(); //called after setDirectory
    }, errorHandler);
}
//save persistent file
function savePersistentFile(filename, content) {
    PFS.getFile(filename, { create: true, exclusive: false }, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                savePersistentFileSuccess(filename); //called after saveFile
            };
            fileWriter.onerror = function(e) {
                console.log('Write error: ' + e.toString());
                alert('Unable to save file');
            };
            fileWriter.write(content); //start writing
        }, errorHandler);
    }, errorHandler);
}
//save temporary file
function saveTemporaryFile(filename, content) {
    TFS.getFile(filename, { create: true, exclusive: false }, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                saveTemporaryFileSuccess(filename); //called after saveFile
            };
            fileWriter.onerror = function(e) {
                console.log('Write error: ' + e.toString());
                alert('Unable to save file');
            };
            fileWriter.write(content); //start writing
        }, errorHandler);
    }, errorHandler);
}
//read file
function loadFile(filename, fsDir) {
    fsDir.getFile(filename, {}, function(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                loadFileSuccess(filename, this.result); //called after loadFile
            };
            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
}
// load session file in temporary file system
function loadSession(callFunction) {
    TFS.getFile("session", {}, function(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                callFunction(this.result); //called after loadSession
            };
            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
}
//delete file
function deleteFile(filename, fsDir) {
    fsDir.getFile(filename, { create: false }, function(fileEntry) {
        fileEntry.remove(function(e) {
            deleteFileSuccess(); //called after deletefile
        }, errorHandler);
    }, errorHandler);
}
// error handler
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