const express = require('express');
const app = express();
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const Cart = require("../models/cart");
const User = require("../models/user");
const Table = require("../models/table");
const Order = require("../models/order");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// APP INFO
const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "	trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};
//-----------------------------ZALO PAYMENT---------------------------------
const zaloPay = async (req, res) => {
    const embed_data = {
        redirecturl: "http://localhost:5173/user/"
    };
    // Tao phien thanh toan cho ZaloPay
    const userId = req.user;
    const items = req.body.items;
    const {total} = req.body;
    console.log(req.body);

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        // userId: userId._id.toString(),
        // carts: JSON.stringify(items),
        // address: address, // Lưu địa chỉ vào metadata
        // table_id: table_id,
        // note: note,
        // total: total,
        //
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: "user123",
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: total,
        description: `Payment for the order #${transID}`,
        bank_code: "",
        callback_url: "https://cb61-42-114-186-118.ngrok-free.app/callback"
    };
    
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
    try {
        // Thực hiện yêu cầu với axios và đợi phản hồi
        const result = await axios.post(config.endpoint, null, { params: order })

        // In toàn bộ phản hồi từ Zalopay API để kiểm tra nội dung
        console.log("Phản hồi từ Zalopay API:", result);

        // Kiểm tra nếu có `status` và `data`
        if (result && result.status && result.data) {
            // Gửi phản hồi từ Zalopay API về client
            return res.status(result.status).json(result.data);
        } else {
            console.error("Phản hồi từ Zalopay không hợp lệ:", result);
            return res.status(500).send("Payment error: Invalid response from Zalopay.");
        }

    } catch (error) {
        console.error("Lỗi khi gọi Zalopay API:", error.message);
        return res.status(500).send("Payment error");
    }
};



// Hàm callback để lưu vào DB
 const callBack = async (req, res) => {
  console.log("Received callback request:", req.body); 
    let result = {};
  
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      console.log("Data string from ZaloPay:", dataStr);
        console.log("MAC from ZaloPay:", reqMac);
  
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
  
  
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        console.error("MAC mismatch. Request is invalid.");
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      }
      else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        console.log("MAC verification successful.");
          let dataJson = JSON.parse(dataStr, config.key2);
          console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
    
          result.return_code = 1;
          result.return_message = "success";
          // udate vào db ở vị trí này 
      }
    } catch (ex) {
      console.error("Error processing callback:", ex.message);
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    res.json(result);
  };




//-----------------------------MOMO PAYMENT--------------------------------
const momoPay = async (req, res) => {
 // cai nay de ra total
  const items = req.body.items;
  const {total} = req.body;
  console.log(req.body);

  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var orderInfo = 'pay with MoMo';
  var partnerCode = 'MOMO';
  var redirectUrl = 'http://localhost:5173/user/';
  var ipnUrl = 'https://277a-42-116-202-101.ngrok-free.app/callback-momo';
  var requestType = "payWithMethod";
  var amount = total;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData ='';
  var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
  var orderGroupId ='';
  var autoCapture =true;
  var lang = 'vi';

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------")
  console.log(rawSignature)
  //signature
  const crypto = require('crypto');
  var signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
  console.log("--------------------SIGNATURE----------------")
  console.log(signature)

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
      partnerCode : partnerCode,
      partnerName : "Test",
      storeId : "MomoTestStore",
      requestId : requestId,
      amount : amount,
      orderId : orderId,
      orderInfo : orderInfo,
      redirectUrl : redirectUrl,
      ipnUrl : ipnUrl,
      lang : lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData : extraData,
      orderGroupId: orderGroupId,
      signature : signature
  });

  // option for axios
  const options =  {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
      },
      data: requestBody
  }
  let result;
  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch  (error) {
    console.error("Error when processing MoMo payment:", error.response?.data || error.message);
    return res.status(500).json({
      statusCode: 500,
      message: error.response?.data || "Server error"
      })
  }
}

const callBackMomo = async (req, res) =>{
  console.log("CallBack")
  console.log(req.body);
  // update order over here

  return res.status(200).json(req.body);
}

  
module.exports = {
  zaloPay,
  callBack,
  momoPay,
  callBackMomo
};


