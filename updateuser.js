/**
 * Created by lcom23_two on 1/20/2017.
 */
var mongobd = require("mongodb");
var mongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/dataTable";


function updateuser() {

    this.get = function (res) {

        mongoClient.connect(url,function (err, db) {
            if(err){
                console.log("unable to connrct:"+url);
            }
            else
            {
                //  console.log("connected to:"+url);
                db.collection('dt').update({"name": "name3"},{$set:{"name": "name5"}});
                res.send("data modified!!!!");
                // db.close();
            }
        });

    }
}
module.exports = new updateuser();
