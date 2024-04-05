const Cart = require("../models/cart");
const FoodItem = require("../models/foodItem");
const addToCart = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const { id } = req.params;
        let { qty } = req.params;
        const foodItem = await FoodItem.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food not found" });
        }

        const findUsersCart = await Cart.find({
            userID: userID,
            status: "pending",
        });

        const existingCartItem = findUsersCart.find((eachItemInUseCart) => {
            return eachItemInUseCart.foodID.toString() === foodItem._id.toString();
        });

        if (existingCartItem) {
            existingCartItem.quantity += parseInt(qty);
            await existingCartItem.save();
            const findCartItems = await Cart.find({
                userID,
                status: "pending",
            }).populate({
                path: "foodID",
                select: "name image price",
            });

            return res.status(200).json({
                success: true,
                message: `${foodItem.name} quantity was updated to ${existingCartItem.quantity}`,
                data: findCartItems,
            });
        } else {
            if ((foodItem.id === id && qty <= 0) || null || undefined) {
                qty = 1;
            }
            if (foodItem.id === id && qty >= 1) {
                await Cart.create({
                    userID,
                    foodID: foodItem.id,
                    message: `${foodItem.name} quantity was updated to ${qty}`,
                    quantity: qty,
                });

                const findCartItems = await Cart.find({
                    userID,
                    status: "pending",
                }).populate({
                    path: "foodID",
                    select: "name image price",
                });

                return res.status(201).json({
                    success: true,
                    message: `${foodItem.name} was added to cart`,
                    data: findCartItems,
                });
            }
        }
        return res.status(501).json({
            message: `This isn't implemented as you have ${foodItem.name} in your cart before`,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const allCartItem = async (req, res, next) => {
    try {
        const userID = req.user;
        const findUsersCart = await Cart.find({
            userID,
            status: "pending",
        }).populate({
            path: "foodID",
            select: "name image price",
        });

        return res.status(200).json({
            success: true,
            data: findUsersCart,
        });
    } catch (error) {
        next(error);
    }
};

const editCart = async (req, res, next) => {
    try {
        const { foodItemForUpdate } = req.params;
        const userID = req.user._id;
        const newQuantity = req.params.qty;
        const findCart = await Cart.findById(foodItemForUpdate);

        console.log(findCart.userID);
        if (findCart.userID.toString() === userID.toString() && findCart.quantity.toString() !== newQuantity.toString()) {
            if (newQuantity <= 0 || null || undefined) {
                return res.status(501).json({
                    success: false,
                    message: "Item cannot be less than one, so not implemented",
                });
            }

            if (newQuantity >= 1) {
                await findCart.updateOne({
                    quantity: newQuantity,
                });

                return res.status(201).json({
                    success: true,
                    message: `${findCart.foodID} qty was updated to ${newQuantity}`,
                });
            }
        }
        return res.status(200).json({
            success: true,
            message: "in it really state nothing happened",
        });
    } catch (error) {
        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const userID = req.user._id; 
        const findUsersCart = await Cart.find({userID: userID})
        const foodItemRemove = req.params.id;
        
        const checkCart = findUsersCart.filter((eachItemInUseCart) => {
            
            return (
                eachItemInUseCart._id.toString() === foodItemRemove.toString()
            );
        })

        if (checkCart.length !== 0 && checkCart !== undefined && checkCart !== null ) {
            await Cart.deleteOne({_id: checkCart[0]._id.toString()});
            
            return res.status(201).json({
                success: true,
                message: `Removed from cart`,
                data: checkCart
            })
        }
        
        return res.status(200).json("looks like the item was not found");
    } catch(error) {
        next(error);
    }
}

const getMostOrderedFoodsToday = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0)

        const result = await Cart.aggregate([
            {
                $match: {
                    userID: req.user._id,
                    createdAt: {$gte: today},
                    status: {$in: ["confirmed", "delivered"]}
                },
            },
            {
                $group: {
                    _id: "foodID",
                    totalOrdered: {$sum: "$quantity"}
                }
            },
            {
                $lookup: {
                    from: "fooditems", 
                    localField:"_id",
                    foreignField:"_id",
                    as: "foodItem"
                }
            }, 
            {
                $sort: {totalOrdered: -1}
            },
            {
                $limit: 10
            }
        ]);

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getMostOrderedFoodsThisWeek = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDate()) // lay ngay dau tuan (Chu nhat la 0)

        const result = await Cart.aggregate([
            {
                $match: {
                    userID: req.user._id,
                    createdAt: {$gte: startOfWeek},
                    status: {$in: ["confirmed", "delivered"]},
                },
            }, 
            {
                $group: {
                    _id: "foodID", 
                    totalOrdered: {$sum: "$quantity"}
                }
            }, 
            {
                $lookup: {
                    from: "fooditems",
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem"
                }
            }, 
            {
                $sort: {totalOrdered: -1}
            },
            {
                $limit: 10
            }
        ])

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getMostOrderedFoodsTodayAdmin = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0)

        if (req.user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "Not authorized to access"
            })
        }
        const result = await Cart.aggregate([
            {
                $match: {
                    userID: req.user._id,
                    createdAt: {$gte: today},
                    status: {$in: ["confirmed", "delivered"]}
                },
            },
            {
                $group: {
                    _id: "foodID",
                    totalOrdered: {$sum: "$quantity"}
                }
            },
            {
                $lookup: {
                    from: "fooditems", 
                    localField:"_id",
                    foreignField:"_id",
                    as: "foodItem"
                }
            }, 
            {
                $sort: {totalOrdered: -1}
            },
            {
                $limit: 10
            }
        ]);

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    addToCart,
    allCartItem,
    editCart,
    removeFromCart,
    getMostOrderedFoodsToday,
    getMostOrderedFoodsThisWeek,
    getMostOrderedFoodsTodayAdmin
};
