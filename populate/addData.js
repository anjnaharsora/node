/**
 * Created by lcom23_two on 1/23/2017.
 */
var Orders = require("./Orders.js");
var Customer = require("./Customer.js");
var express = require("express");
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kinjal');

var customer = new Customer({

    customer_name  : "kinjal",
    contact_name  : "kinjal",
    country : "india"
});

customer.save();

var order = new Orders ({
   order_id : 101,
    customer_id : customer._id,

});

order.save(function (err) {
   if(err){
      console.log(err);
   }
   else
   {
       Orders.find({}).populate('customer_id').exec(function (err, data) {
           console.log(JSON.stringify(data,null,"\t"))
       })
   }
});