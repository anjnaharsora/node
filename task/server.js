var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");
var User = require("./database/UserData.js");
var app = express();
var cors=require('cors');
var server = require('http').Server(app);
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/assignment');

var multer  = require('multer');

app.use(express.static('html'));


var filename;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './html/uploads/')
    },
    filename: function (req, file, cb) {
        filename=Date.now()+'.jpg';
        cb(null, filename );

    }
});

var upload = multer({ storage: storage });
app.post('/multer', upload.single('file'));

app.post("/insertData",function (req, res) {

    var user = new User();
    user.name = req.body.name;
    user.pname = req.body.pname;
    user.ufile = filename;
    user.save(function (err1,data1) {
        if(err1){
            res.send(err1);
        }
        else{
            res.send(data1);
        }
    });

});

app.get("/displayData",function (req, res) {

    User.find({},(function (err,data)
        {
            if(err){
                res.send(err);
            }
            else {
                res.send(data);
            }
        })
    );
});

app.get("/getData/:id",function (req, res) {

    User.find({"_id" : req.params.id},(function (err,data)
        {
            if(err){
                res.send(err);
            }
            else {

                res.send(data);

            }
        })
    );
});

app.delete("/deleteData/:id",function (req, res) {

    User.remove({"_id":req.params.id},function (err,data) {
        if(err){
            res.send(err);
        }
        else{
            console.log("data deleted");
            res.send(data);
        }
    });
});

app.post("/updateData/:id",function (req, res) {

    console.log(req.params.id);
    console.log(req.body.name);
    console.log(req.body.pname);

    User.update({"_id":req.params.id},{$set:{"name":req.body.name,"pname":req.body.pname}},function (err,data) {
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

// app.get("*",function (req, res) {
//     res.sendFile(__dirname+"/public/index.html");
// });


var server = app.listen(8087,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
});