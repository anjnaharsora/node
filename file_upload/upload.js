/**
 * Created by lcom23_two on 1/24/2017.
 */
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }


    sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname+"/" + sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
            console.log(sampleFile.name);
            console.log(JSON.stringify(sampleFile));
        }
    });
});

var server = app.listen(8050,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host + port);
});