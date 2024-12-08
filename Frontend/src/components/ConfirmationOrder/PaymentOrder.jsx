/** @format */

import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../index";
import CartContext from "../../context/cartContext";
import { motion } from "framer-motion";
import TableImg from "../../assets/images/table.png";
import MenuDropDown from "../MenuDropDown";
import tableApi from "../../api/table";
import handleCheckout from "../../utils/checkOutUtils";
import handleCheckoutZalo from "../../utils/checkOutZaloPay";
import { useSelector } from "react-redux";
import StripeImg from "../../assets/images/PaymentMethod/stripe.png"
import ZaloPayImg from "../../assets/images/PaymentMethod/zalo.png"
import MomoImg from "../../assets/images/PaymentMethod/momo.png"
import PayalImg from "../../assets/images/PaymentMethod/payal.png"
import PayosImg from "../../assets/images/PaymentMethod/payos.png"
import { FaStripeS } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import handleCheckoutMomo from "../../utils/checkOutMomoPay";
import handleCreateOrder from "../../utils/checkOutCreateOrder";

const PaymentOrder = () => {
    const cart = useSelector((state) => state.cart.value);
    const { toggleCart, toggleLocation, openLocation } =
        useContext(CartContext);
    const [option, setOption] = useState([]);
    let options = option.map((item) =>
        item.status === "Available"
            ? `Bàn ${item.tableNumber} : 🔔`
            : `Bàn ${item.tableNumber} : ❌`
    );
    const [orderForTable, setOrderForTable] = useState(false);
    const [note, setNote] = useState("");
    const [tableId, setTableId] = useState(null);

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await tableApi.getAll();
                setOption(response.tables);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTable();
    }, []);

    const [tableOption, setTableOption] = useState("Bàn 1");

    useEffect(() => {
        const index = options.indexOf(tableOption);
        setTableId(option[index]?._id);
        console.log(tableId);
    }, [option, options, tableId, tableOption]);

    return (
        <div className="flex h-full flex-col bg-base/dark-bg-2-14 dark:bg-light-bg-1 shadow-xl text-white w-[400px] border-l border-dark">
            {/* {!orderForTable && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
                    animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
                    transition={{ duration: 0.5 }} // Thời gian của animation
                    className="flex flex-1 items-center px-4 py-6 sm:px-6">
                    <Button
                        btnText="Payment Method"
                        handler={() => setOrderForTable(true)}
                    />
                </motion.div>
            )} */}
            {/* {orderForTable && ( */}
            <motion.div
                initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
                animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
                transition={{ duration: 0.5 }} // Thời gian của animation
                className="flex flex-col flex-1 items-center  px-5 py-7 sm:px-5 gap-6">
                <h2 className="text-black font-medium text-xl">
                    Vui lòng lựa chọn phương thức thanh toán!
                </h2>

                {/* <div className="mt-4 h-[150px]">
                        <img
                            src={TableImg}
                            alt="table"
                            className="h-full object-contain"
                        />
                    </div> */}
                {/* <MenuDropDown
                        option={options}
                        options={tableOption}
                        setOptions={setTableOption}
                    /> */}
                {/* note */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-3 w-full ">
                    {/* <Button
                            btnText="Hủy Bỏ"
                            outline={true}
                            handler={() => {
                                toggleLocation();
                            }}
                        /> */}
                    <Button
                        className='w-full py-100'
                        outline
                        btnText={
                            <span className="flex gap-3 text-black justify-center items-center w-full" style={{ height: '25px' }}>
                                <span
                                    className="w-1/4 flex items-center justify-center"
                                >
                                    <FaStripeS className="text-blue-600 bg-blue-100 p-1.5 w-7 h-7 rounded-[50%]" />
                                </span>
                                <span className="w-3/4 justify-start flex">
                                    Payment With Stripe
                                </span>
                            </span>
                        }
                        handler={() => {
                            handleCheckout(cart, note, tableId, null);
                        }}
                    />
                    <Button
                        className='w-full py-100'
                        outline
                        btnText={
                            <span className="flex gap-3 text-black justify-center items-center w-full" style={{ height: '25px' }}>
                                <span className="w-1/4 flex items-center justify-center">
                                    <img src={ZaloPayImg} alt="" className="w-8 h-8" />
                                </span>
                                <span className="w-3/4 justify-start flex">
                                    Payment With ZaloPay
                                </span>
                            </span>
                        }
                        // handler={() => {
                        //     handleCheckoutZalo(cart, note, tableId, null);
                        // }}
                        handler={async () => {
                            // Gọi hàm handleCheckoutZalo trước
                            await handleCheckoutZalo(cart, note, tableId, null);

                             // Sau đó gọi API CreateOrder
                             await handleCreateOrder(cartItems, totalAmount, orderNote, address, tableId);
                        }}
                    />
                    <Button
                        className='w-full py-100'
                        outline
                        btnText={
                            <span className="flex gap-3 text-black justify-center items-center w-full" style={{ height: '25px' }}>
                                <span
                                    className="w-1/4 flex items-center justify-center"
                                >
                                    <img src={MomoImg} alt="" className="w-7 h-7" />
                                </span>
                                <span className="w-3/4 justify-start flex">
                                    Payment With MOMO
                                </span>
                            </span>
                        }
                        handler={() => {
                            handleCheckoutMomo(cart, note, tableId, null);
                        }}
                    />
                    <Button
                        className='w-full py-100'
                        outline
                        btnText={
                            <span className="flex gap-3 text-black justify-center items-center w-full" style={{ height: '25px' }}>
                                <span
                                    className="w-1/4 flex items-center justify-center"
                                >
                                    <img src={PayalImg} alt="" className="w-9 h-7" />
                                </span>
                                <span className="w-3/4 justify-start flex">
                                    Payment With PAYPAL
                                </span>
                            </span>
                        }
                        handler={() => {
                            handleCheckout(cart, note, tableId, null);
                        }}
                    />
                    <Button
                        className='w-full py-100'
                        outline
                        btnText={
                            <span className="flex gap-3 text-black justify-center items-center w-full" style={{ height: '25px' }}>
                                <span
                                    className="w-1/4 flex items-center justify-center"
                                >
                                    <img src={PayosImg} alt="" className="w-70 h-5" />
                                </span>
                                <span className="w-3/4 justify-start flex">
                                    Payment With PayOS
                                </span>
                            </span>
                        }
                        handler={() => {
                            handleCheckout(cart, note, tableId, null);
                        }}
                    />

                    <div className="mt-4 w-full">
                        <label className="block mb-2 text-black ">Ghi chú</label>
                        <textarea
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Nhập ghi chú của bạn"
                            className="bg-base/dark-line block rounded-md mb-10 p-2 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none leading-6"
                        />
                    </div>

                </motion.div>
            </motion.div>
            {/* )} */}
            <div
                className={`flex gap-3 px-6 mb-6 h-[48px] transition-all ${orderForTable || openLocation
                    ? "opacity-0 translate-y-20"
                    : "opacity-100 translate-y-0"
                    }`}>
                <Button
                    btnText="Hủy Bỏ"
                    outline={true}
                    handler={() => {
                        toggleCart();
                    }}
                />
                {/* <Button
                    btnText=" Thanh Toán"
                    handler={() => {
                        toggleLocation();
                    }}
                /> */}
            </div>
        </div>
    );
};

export default PaymentOrder;
