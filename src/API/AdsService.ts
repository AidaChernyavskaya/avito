import axios from "axios";
import {Advertisement} from "../types";

export default class AdsService {
    static async getAll (limit = 5, page = 1) {
        return await axios.get(`http://localhost:8000/advertisements`, {
            params: {
                _limit: limit,
                _page: page,
            }
        });
    }

    static async getById (id: number) {
        const response = await axios.get(`http://localhost:8000/advertisements/${id}`);
        return response.data;
    }

    static async getByName (name: string) {
        const response = await axios.get(`http://localhost:8000/advertisements`, {
            params: {
                name_like: name
            }
        });
        return response.data;
    }

    static async sendData(adv: Advertisement) {
        return await axios.post(`http://localhost:8000/advertisements`, {
            ...adv
        })
            .catch(function (error) {
                console.log(error.message);
                return false;
            });
    }

    static async editData(adv: Advertisement) {
        return await axios.put(`http://localhost:8000/advertisements/${adv.id}`, {
            ...adv
        })
            .catch(function (error) {
                console.log(error.message);
                return false;
            });
    }
};