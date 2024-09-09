import axios from "axios";

export default class AdsService {
    static async getAll () {
        const response = await axios.get(`http://localhost:8000/advertisements`);
        return response.data;
    }

    static async getById (id: number) {
        const response = await axios.get(`http://localhost:8000/advertisements/${id}`);
        return response.data;
    }
};