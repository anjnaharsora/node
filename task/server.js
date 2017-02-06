var express = require("express");
var bodyParser = require('body-parser');
var multer  = require('multer');

var User = require("./js/database/UserData.js");
var app = express();

var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('html'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/assignment');

var filename;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        filename=Date.now()+'.jpg';
        cb(null, filename );

    }
});

var upload = multer({ storage: storage });
app.post('/multer', upload.single('file'));

app.post("/register",function (req, res) {

    var user = new User();
    user.name = req.body.name;
    user.pname = req.body.pname;
    user.ufile = filename;

     user.save(function (err1, data1) {
        if (err1) {
            res.send(err1);
            console.log(err1);
            }
            else {
            res.send(data1);
            console.log(data1);
        }
    });
});

/*
app.get("*",function (req,res) {
    console.log(__dirname);
  //  res.sendFile(__dirname+"/index.html");
});
*/
var server = app.listen(8087,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
});