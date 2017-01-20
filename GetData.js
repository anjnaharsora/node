/**
 * Created by lcom23_two on 1/19/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var server = require('http').Server(app);
var sql = require('./connection');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/getData",function (req,res) {

   sql.executeSql("select * from employee",function (err, data) {
       if(err){

           return res.send({error:err});
       }
       else
       {
           return res.send({data :data});
       }
   })
});

server = app.listen(8055,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);

});