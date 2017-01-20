/**
 * Created by lcom23_two on 1/20/2017.
 */
var mongobd = require("mongodb");
var mongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/dataTable";

function minsert() {
    this.get = function (res) {

        mongoClient.connect(url,function (err , db) {
            if (!err) {
                //  console.log("connected to:"+url);
                var data = {"name" : db.body.name , "quote" : db.body.quote};
                db.collection('dt').insert(data);

                db.collection('dt').find({"name" : "name4"}).toArray(function (err, data) {
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

module.exports = new minsert();