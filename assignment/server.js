var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");
var User = require("./public/database/UserData.js");
var City = require("./public/database/CityData.js");
var State = require("./public/database/StateData.js");
var app = express();

var server = require('http').Server(app);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTable');

var multer  = require('multer');

app.use(express.static('public'));
app.use('/static', express.static('uploads'));

var filename;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        filename=file.originalname+'-'+req.body.name+'.jpg';
        cb(null, filename );

    }
});

var upload = multer({ storage: storage });
app.post('/multer', upload.single('file'));


app.post("/insertState",function (req, res) {
    var state = new State();
    state.name = req.body.name;
    State.find({},(function (err,data)
        {
            if(err){
                res.send(err);
            }
            else {

                state.id = (data.length)+1;
                console.log(data.length);
                // res.send(data);

                state.save(function (err1,data1) {
                    if(err){
                        res.send(err1);
                    }
                    else{
                        res.send(data1);
                    }
                });
            }
        })
    );
});


app.get("/getState",function (req, res) {

    State.find({},(function (err,data)
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

app.get("/getCity/:id",function (req, res) {

    City.find({"state_id": req.params.id},(function (err,data)
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

app.post("/insertCity",function (req, res) {
    var city = new City();
    city.name = req.body.name;
    city.state_id = req.body.state_id;
    City.find({},(function (err,data)
        {
            if(err){
                res.send(err);
            }
            else {

                city.id = (data.length)+1;
                console.log(data.length);
                // res.send(data);

                city.save(function (err1,data1) {
                    if(err1){
                        res.send(err1);
                    }
                    else{
                        res.send(data1);
                    }
                });
            }
        })
    );
});

app.post("/insertData",function (req, res) {

    var user = new User();
    user.name = req.body.name;
    var state = req.body.state;
    user.city = req.body.city;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.ufile = filename;
    State.find({"id" : state},(function (err,data)
        {
            if(err){
                res.send(err);
            }
            else {

                user.state = data[0].name;
                User.find({},(function (err,data)
                    {
                        if(err){
                            res.send(err);
                        }
                        else {

                            user.save(function (err1,data1) {
                                if(err1){
                                    res.send(err1);
                                }
                                else{
                                    res.send(data1);
                                }
                            });
                        }
                    })
                );
            }
        })
    );

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

app.post("/updateData",function (req, res) {

    User.update({"_id":req.body._id},{$set:{"name":req.body.name,"state":req.body.state,"city":req.body.city,"gender":req.body.gender,"email":req.body.email}},function (err,data) {
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

app.get("*",function (req, res) {
    res.sendFile(__dirname+"/public/index.html");
});


var server = app.listen(8087,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
});