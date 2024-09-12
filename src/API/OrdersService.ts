import {BASE_URL, ordersPath} from "../constants";
import axios from "axios";

export default class OrdersService {
    static async get (params = {}) {
        return axios.get(`${BASE_URL}/${ordersPath}`, {params: params});
    }
};
