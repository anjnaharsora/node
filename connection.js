var mysql = require('mysql');

var dbconfig = {

    host : "localhost",
    user : "root",
    password : "",
    database : "node_js"
};

exports.executeSql = function (sql,callback) {
  var conn =mysql.createConnection(dbconfig);
    conn.connect(function (err) {
        if(!err){
            conn.query(sql,function (err,data) {
                if (!err){
                    conn.end();
                    callback(null,data);
                }
                else {
                    conn.end();
                    console.log(err);
                    err.status = 500;
                    callback(err,null);
                }
            })

        }
        else {
            console.log(err);
            conn.end();
            err.status = 500;

        }

    })
};