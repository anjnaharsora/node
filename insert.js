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

app.post("/addData",function (req,res) {

    sql.executeSql("insert into employee(email,description) VALUES ('"+req.body.email+"','"+req.body.description+"')",function (err, data) {
        if (!err) {
            //return res.send({data: data});
             res.redirect('./update.html');
        } else {
            return res.send({error: err});
        }
    })
});

server = app.listen(8055,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);

});