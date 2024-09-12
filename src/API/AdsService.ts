import {Advertisement} from "../types";
import {advertisementsPath, BASE_URL} from "../constants";
import axios from "axios";

const advertisementsUrl = `${BASE_URL}/${advertisementsPath}`;

export default class AdsService {
    static async getByParams (params = {}) {
        return axios.get(advertisementsUrl, { params: params });
    }

    static async getById (id: number) {
        return axios.get(`${advertisementsUrl}/${id}`);
    }

    static async createAdvertisement(adv: Advertisement) {
        return axios.post(advertisementsUrl, {...adv})
    }

    static async editAdvertisement(adv: Advertisement) {
        return axios.put(`${advertisementsUrl}/${adv.id}`, {...adv})
    }
};
