import axiosClient from "./axiosClient";


const MomoApi = {
momoPay: (data) =>{
  const url = `/payment/momopay`;
  return axiosClient.post(url, data);
},
};

export default MomoApi;