import ZaloApi from "../api/zalopay";


const handleCheckoutZalo = async (cart, note, tableId, locationData) => {
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

    // Gửi yêu cầu đến API ZaloPay
    await ZaloApi.zaloPay(order)
        .then((response) => {
            console.log(response); // Ghi log kết quả từ API
            if (response.order_url) {
                // Redirect sang URL trả về
                window.location.href = response.order_url;
            } else {
                console.error("Không có URL để chuyển hướng");
            }
        })
        .catch((err) => {
            console.error("Lỗi khi gửi yêu cầu thanh toán ZaloPay:", err);
        });
};

export default handleCheckoutZalo;