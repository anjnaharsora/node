/**
 * Created by lcom23_two on 1/20/2017.
 */

var mongobd = require("mongodb");
var mongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/dataTable";

function adduser() {

    this.get = function (res) {

        mongoClient.connect(url,function (err, db) {
            if(err){
                console.log("unable to connrct:"+url);
            }
            else
            {
                //  console.log("connected to:"+url);
                db.collection('dt').insert({"name": "name3","quote" : "quote3"});
                db.collection('dt').find({"name": "name3"}).toArray(function (err, data) {
                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log(data);
                        res.send(data);
                    }
                });
                // db.close();
            }
        });

    }
}


module.exports = new adduser();
