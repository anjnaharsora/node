/**
 * Created by lcom23_two on 1/19/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var server = require('http').Server(app);
var sql = require('./index');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/showSignInPage',function(req,res){

});