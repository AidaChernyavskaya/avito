import axios from "axios";

export default class OrdersService {
    static async getAll () {
        const response = await axios.get(`http://localhost:8000/orders`);
        return response.data;
    }

    static async getByStatus (status: number) {
        const response = await axios.get(`http://localhost:8000/orders`, {
            params: {
                status: status
            }
        });
        return response.data;
    }

    static async getByPrice (order: string, field =  'total') {
        const response = await axios.get(`http://localhost:8000/orders`, {
            params: {
                _sort: field,
                _order: order,
            }
        });
        return response.data;
    }
};