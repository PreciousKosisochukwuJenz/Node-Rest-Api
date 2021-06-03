const mongoose = require("mongoose");

 const OrderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("Order",OrderSchema);