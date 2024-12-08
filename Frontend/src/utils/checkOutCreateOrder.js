import orderApi from "../api/order"; // Import API phía frontend

const handleCreateOrder = async (cartItems, totalAmount, orderNote, address, tableId) => {
    console.log("run tesst")
    try {
        // Chuẩn bị dữ liệu để gửi đến backend
        const orderData = {
            items: cartItems.map(item => item.id), // Chỉ lấy ID của sản phẩm
            total: totalAmount,
            note: orderNote || "", // Nếu không có ghi chú, gửi chuỗi rỗng
            address: address || null, // Nếu không có địa chỉ, gửi null
            id_table: tableId || null, // Nếu không có tableId, gửi null
        };

        // Gửi yêu cầu POST đến API backend
        const response = await orderApi.add(orderData);

        // Kiểm tra kết quả trả về từ backend
        if (response.success) {
            console.log("Order created successfully:", response.data);

            // Hiển thị thông báo thành công cho người dùng
            alert("Đặt hàng thành công!");

            // Thêm logic tùy chỉnh sau khi đặt hàng thành công (ví dụ: điều hướng)
            // Ví dụ: điều hướng đến trang xác nhận đơn hàng
            // navigate("/order-confirmation");
        } else {
            console.error("Failed to create order:", response.message);
            alert("Đặt hàng thất bại. Vui lòng thử lại.");
        }
    } catch (error) {
        // Xử lý lỗi trong quá trình gọi API
        console.error("Error creating order:", error);
        alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    }
};

export default handleCreateOrder;