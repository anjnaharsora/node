/**
 * Created by lcom23_two on 1/20/2017.
 */

var mongobd = require("mongodb");
var mongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/dataTable";


function deleteuser() {

    this.get = function (res) {

        mongoClient.connect(url,function (err, db) {
            if(err){
                console.log("unable to connrct:"+url);
            }
            else
            {
                //  console.log("connected to:"+url);
                db.collection('dt').remove({"name": "name5"});

                res.send("data deleted>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // db.close();
            }
        });

    }
}

module.exports = new deleteuser();
