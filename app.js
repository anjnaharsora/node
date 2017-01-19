var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "node_js"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');

    con.query('SELECT * FROM employees',function(err,rows){
        if(err) {
            console.log('Error connecting to Db');
            return;}

        console.log('Data received from Db:\n');
        console.log(rows);
    });
});

con.end(function(err) {
});