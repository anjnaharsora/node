/**
 * Created by lcom23_two on 1/19/2017.
 */
var mconnect = require("./mconnect");

var bodyParser = require('body-parser');
var express = require("express");
var path = require("path");
var server = require('http').Server(app);

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/mget",function (err, data) {

        mconnect.get(data);
       // console.log(data);

});

/*mongoClient.connect(url,function (err, db) {
    if(!err){
        console.log("connected:"+url);

        var collection = db.collation('dataTable');
        var data1 = {"title":"title2","desc":"desc2"};
        var data2 = {"title":"title3","desc":"desc3"};
        var data3 = {"title":"title4","desc":"desc4"};

        collection.insert([data1,data2,data3],function (err, result) {
            if(err){
                console.log(err);
            }
            else {
                console.log(result);
            }
        })
    }
    else {
        console.log(err);
    }
});*/

var server = app.listen(8055,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
})