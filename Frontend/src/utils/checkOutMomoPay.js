import MomoApi from "../api/momo";


const handleCheckoutMomo = async (cart, note, tableId, locationData) => {
    const total = cart.reduce((total, item) => {
        return total + item.quantity * item.foodId.price;
    }, 0);

    let order = {};

    if (tableId !== null) {
        order = {
            table_id: tableId,
            items: cart.map((item) => item._id), // Chỉ lấy _id của mỗi món
            total: total,
            note: note,
        };
    } else {
        order = {
            address: locationData,
            items: cart.map((item) => item._id), // Chỉ lấy _id của mỗi món
            total: total,
            note: note,
        };
    }

    try {
        // Gửi yêu cầu đến API MomoPay
        const response = await MomoApi.momoPay(order);

        console.log(response); // Ghi log kết quả từ API

        // Kiểm tra và redirect sang URL trả về
        if (response.payUrl) {
            window.location.href = response.payUrl; // Redirect đến URL thanh toán
        } else {
            console.error("Không tìm thấy URL thanh toán từ API.");
        }
    } catch (err) {
        console.error("Lỗi khi gửi yêu cầu thanh toán MomoPay:", err);
    }
};

export default handleCheckoutMomo;