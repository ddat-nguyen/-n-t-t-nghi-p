const Cart = require('../models/cart');
const Order = require('../models/order');
const User = require('../models/user');

const createOrder = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const {items, total, note, address, table_id} = req.body;
        const {phone} = await User.findById(userID);

    const newOrder = table_id ? new Order({
        user_id: userID,
        items: items,
        total: total,
        note: note,
        address: address,
        phone: phone,
        table_id: table_id
    }) : new Order({
        user_id: userID,
        items: items,
        total: total,
        note: note,
        address: address,
        phone: phone,
    })

    await newOrder.save();
    // update status of cart items to confirmed
    await Cart.updateMany({_id: {$in: items}}, {$set: {status: "confirmed"}});
    
    // update user order array in user model 
    await User.findByIdAndUpdate(userID, {$push: {orders: newOrder._id}}, {new: true}); 

    return res.status(201).json({
        success: true, 
        message: "Order created successfully",
        data: newOrder
    })
    } catch (error) {
        next(error);
    }
};

const getOrderByID = async (req, res, next) => {
    try {
        const {id} = req.params;

        const order = await Order.findById(id).populate({
            path: "items", 
            populate: {
                path: "foodID",
                select: "name image price"
            }
        }).sort({createdAt: -1})
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        
        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error);
    }
}

const getAllOrders = async (req, res, next) => {
    try {
        const page = 1;
        const limit = 10;
        const orders = await Order.find({user_id: req.user._id}).skip((page - 1) * limit).limit(10).populate({
            path: "items",
            populate: {
                path: "foodID",
                select: "name image price",
            },
        }).sort({ createdAt: -1 });;

        return res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    getOrderByID, 
    getAllOrders
}