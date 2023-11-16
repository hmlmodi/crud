// Define Order schema
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, unique: true },
    item_name: String,
    cost: Number,
    order_date: Date,
    delivery_date: Date,    
});

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;
