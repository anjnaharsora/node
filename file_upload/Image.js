/**
 * Created by lcom23_two on 1/25/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Image = new Schema({
    img : {name : Buffer , contectType : String}
    });
module.exports = mongoose.model('Image',Image);