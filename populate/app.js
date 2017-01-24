/**
 * Created by lcom23_two on 1/23/2017.
 */

var express = require("express");
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTable');

var User = require('./User'),
    Post = require('./Post');

var alex = new User({
    name: "Alex"
});

var joe = new User({
    name: "Joe"
});

alex.save();
joe.save();

var post = new Post({
    title : "hello",
    postedBy:alex._id,
    comments : [{
        text: "nice post",
        postedBy:joe._id
    }]

});

post.save(function (error) {
    if(!error){
   Post.find({}).populate('postedBy').populate('comments.postedBy').exec(function (err, data) {
       console.log(JSON.stringify(data,null,"\t"))
   })
    }
});
var server = app.listen(8075,function () {
    var host = server.address().address;
    var port  = server.address().port;
    console.log(host + port);
});