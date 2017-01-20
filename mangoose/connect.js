/**
 * Created by lcom23_two on 1/20/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTable');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var Person =require('./User.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// create a bear (accessed at POST http://localhost:8080/api/bears)
app.post('/add',function(req, res) {

    var person = new Person();      // create a new instance of the Bear model
    person.name = req.body.name;  // set the bears name (comes from the request)
    person.usename = req.body.username;
    person.password = req.body.password;
    // save the bear and check for errors
    person.save(function(err,data) {
        if (err) {
            res.send(err);}
        else
        {
            res.send(data);
        }


    });

});

app.post('/delete',function(req,res){
    Person.remove({"name":req.body.name},function (err,data) {
        if(err){
            res.send(err);
        }
        else
        {
            res.send(data);
        }

    });
});
app.post('/update',function (req,res) {
    Person.update({"name":req.body.name},{$set:{"username":"userr1","password":"abgfhjfgyc"}},function (err,data) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(data);
        }
    })


});
app.get('/display',function (req,res) {
    Person.find(function (err,data) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(data);
        }

    })
})

