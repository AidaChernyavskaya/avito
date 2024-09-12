import {Advertisement} from "../types";
import {axiosInstance} from "./config";
import {advertisementsPath} from "../utils/constants";

export default class AdsService {
    static async getByParams (params = {}) {
        return axiosInstance.get(`/${advertisementsPath}`, { params: params });
    }

    static async getById (id: number) {
        return axiosInstance.get(`/${advertisementsPath}/${id}`);
    }

    static async createAdvertisement(adv: Advertisement) {
        return axiosInstance.post(`/${advertisementsPath}`, {...adv})
    }

    static async editAdvertisement(adv: Advertisement) {
        return axiosInstance.put(`/${advertisementsPath}/${adv.id}`, {...adv})
    }
};
