/**
 * Created by lcom23_two on 1/23/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerschema = new Schema({

    customer_name : String,
    contact_name : String,
    country : String
});

module.exports = mongoose.model('Customer',customerschema);