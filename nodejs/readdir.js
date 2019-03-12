var folder = './data';
var fs = require('fs');
fs.readdir(folder, function(error, filelist){
    console.log(filelist);
});