const Cart = require('../models/cart');
const foodItem = require('../models/foodItem');
const Order = require('../models/order');
const User = require('../models/user');
const moment = require("moment");

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

const getLatest = async (req, res, next) => {
    try {
        const order = await Order.find({user_id: req.user._id}).populate({
                path: "items",
                populate: {
                    path: "foodID",
                    select: "name image price",
                },
            })
            .sort({ createdAt: -1 })
            .limit(1);

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

const getAllOrdersAdmin = async (req, res, next) => {
    try {
        const orders = await Order.find().populate({
            path: "items",
            populate: {
                path: "foodID",
                select: "name image price"
            }
        }).sort({createdAt: -1})

        return res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(id, {$set: {status}}, {new: true});

        // if order status is delivered, update status of cart items to delivered
        if (status === "delivered") {
            await Cart.updateMany({_id: {$in: order.items}}, {$set: {status: "delivered"}})
        }

        if (status === "confirmed") {
            const {item} = order;
            items.forEach(async (item) => {
                const {foodID, quantity} = await Cart.findById(item);
                const {quantity: foodQuantity} = food;

                await foodItem.findByIdAndUpdate( foodId,
                    { $set: { quantity: foodQuantity - quantity } },
                    { new: true });
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    } catch (error) {
        next(error);
    }
}

const getTopCustomersLastWeek = async (req, res, next) => {
    try {
        const pipeline = [
            // Group the orders by user_id and calculate the total payment
            {
                $group: {
                    _id: "$user_id",
                    totalPayment: { $sum: "$total" },
                    // tinh tong don hang
                    totalOrders: { $sum: 1 },
                    latestOrder: { $max: "$createdAt" },
                },
            },
            // Lookup user information
            {
                $lookup: {
                    from: "users", // Use the name of your User collection here
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            // Unwind the user array
            { $unwind: "$user" },
            // Sort by the latestOrder field
            { $sort: { latestOrder: -1 } },
            // Project the desired fields
            {
                $project: {
                    _id: 0,
                    username: "$user.username",
                    profileImage: "$user.avatar", // Replace with the actual field name for profile image
                    phone: "$user.phone",
                    totalPayment: 1,
                    totalOrders: 1,
                    latestOrder: 1,
                },
            },
        ];

        const result = await Order.aggregate(pipeline);

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Lỗi server" });
    }
};


const getOrderCountsByStatusThisWeek = async (req, res, next) => {
    try {
        const pipeline = [
            // Filter orders that are created this week
            {
                $match: {
                    createdAt: {
                        $gte: moment().startOf("week").toDate(),
                        $lte: moment().endOf("week").toDate(),
                    },
                },
            },
            // Group the orders by status and calculate the total payment
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
            // Project the desired fields
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            },
        ];

        const result = await Order.aggregate(pipeline);

        return res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    createOrder,
    getOrderByID, 
    getAllOrders,
    getLatest, 
    getAllOrdersAdmin,
    updateOrderStatus,
    getTopCustomersLastWeek,
    getOrderCountsByStatusThisWeek
}