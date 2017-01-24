/**
 * Created by lcom23_two on 1/23/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema =  new Schema({
    name: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User',userschema);