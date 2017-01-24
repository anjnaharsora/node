/**
 * Created by lcom23_two on 1/23/2017.
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("User", UserSchema);