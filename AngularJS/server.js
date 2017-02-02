var express = require("express");
var app = express();
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname+ '-' + Date.now()+'.jpg')
    }
});
var upload = multer({ storage: storage });

app.post('/multer', upload.single('file'));

app.use(express.static(__dirname+"/public"));
app.get("/",function (req, res) {
   res.sendFile(__dirname+"/public/index_file.html");
});

app.listen(8085);
console.log("listennig");