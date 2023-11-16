const Order = require('../../mongo_schema/order');

const appController = {};

// Create a new order
appController.createOrder = async function (req, res) {
    try {
        const { order_id, item_name, cost, order_date, delivery_date } = req.body;
        // Validate for duplicate orders based on order_id
        const existingOrder = await Order.findOne({ order_id });
        if (existingOrder) {
            console.log("sssssssss", req.body)

            return res.status(400).json({ error: 'Duplicate order_id' });
        }

        const order = new Order({
            order_id,
            item_name,
            cost,
            order_date: new Date(order_date),
            delivery_date: new Date(delivery_date),
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update the order for a specific order ID
appController.updateOrder = async function (req, res) {
    try {
        const { order_id, delivery_date } = req.body;

        await Order.updateOne({ order_id }, { $set: { delivery_date: new Date(delivery_date) } });

        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// List all orders for a given date
appController.listOrder = async function (req, res) {

    try {
        const { date } = req.body;
        const formattedDate = new Date(date);

        const orders = await Order.find({ order_date: formattedDate });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Query for a specific order with Order ID
appController.searchOrder = async function (req, res) {

    try {
        const { order_id } = req.body;

        const order = await Order.findOne({ order_id });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an order with Order ID
appController.deleteOrder = async function (req, res) {

    try {
        const { order_id } = req.body;

        await Order.deleteOne({ order_id });

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = appController;