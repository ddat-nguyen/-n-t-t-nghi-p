import axiosClient from "./axiosClient";


const ZaloApi = {
zaloPay: (data) =>{
  const url = `/payment/zalopay`;
  return axiosClient.post(url, data);
},
};

export default ZaloApi;