/**
 * Created by lcom23_two on 1/24/2017.
 */

var express = require("express");
var app = express();

// app.use(express.static('public'));

app.get("/form.html",function (req, res) {
   res.sendFile(__dirname+"/"+"form.html");
});

app.get("/getdata",function (req, res) {
   data = {
       f_name : req.query.fname,
       l_name : req.query.lname
   };

   res.send(JSON.stringify(data));
    console.log(data);
});

var server = app.listen(8080,function () {
    console.log(server.address().port);
});
