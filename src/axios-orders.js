import axios from "axios";

const axiosOrders = axios.create({
  baseURL: "https://burger-ce3c2.firebaseio.com/"
});

export default axiosOrders;