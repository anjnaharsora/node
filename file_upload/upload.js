/**
 * Created by lcom23_two on 1/24/2017.
 */
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var port = require("../model/config.js");
// default options
app.use(fileUpload());

var Image = require("./Image.js");
var fs = require("fs");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kinjal3');
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
            var image = new Image();
            image.name = fs.readFileSync(sampleFile.name);
            image.contentType = 'image/jpg';
            image.save(function (err, data) {
                if(err){
                    console.log(err);
                }
                else {console.log("saved!!!!");}
            });
            res.send('File uploaded!');
            console.log(sampleFile.name);
            console.log(JSON.stringify(sampleFile));
        }
    });
});

var server = app.listen(port.port,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host + port);
});