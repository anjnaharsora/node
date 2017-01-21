const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/post";
var db;

MongoClient.connect(url,function (err, db) {
    if(err){console.log(err);}
    else {


        app.listen(8055,function () {
            console.log("connected!!!");
        })

    }
});