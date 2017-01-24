/**
 * Created by lcom23_two on 1/23/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ordersschema = new Schema({
    order_id : Number,
    customer_id: {type:mongoose.Schema.Types.ObjectId,
                ref : 'Customer'
    },
});

module.exports = mongoose.model('Orders',ordersschema);