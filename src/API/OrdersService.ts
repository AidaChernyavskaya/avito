import {axiosInstance} from "./config";
import {ordersPath} from "../utils/constants";

export default class OrdersService {
    static async get (params = {}) {
        return axiosInstance.get(`/${ordersPath}`, {params: params});
    }
};
