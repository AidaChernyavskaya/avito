import axios from "axios";

export default class AdsService {
    static async getAll (perPage = 5, page = 1) {
        const response = await axios.get(`http://localhost:8000/advertisements`, {
            params: {
                _per_page: perPage,
                _page: page,
            }
        });
        return response.data;
    }

    static async getById (id: number) {
        const response = await axios.get(`http://localhost:8000/advertisements/${id}`);
        return response.data;
    }
};