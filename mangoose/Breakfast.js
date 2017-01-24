/**
 * Created by lcom23_two on 1/21/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
    },
    bacon: {
        type: Number,
        required: [true, 'Why no bacon?']
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea']
    }
});
module.exports = mongoose.model('Person', breakfastSchema);
