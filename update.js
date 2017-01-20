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

app.post("/updateData",function (req,res) {

    sql.executeSql("UPDATE employee SET email= '"+req.body.new_email+"',description ='"+req.body.description+"' WHERE id= '"+req.body.id+"' ",function (err, data) {
        if (!err) {
            return res.send({data: data});
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