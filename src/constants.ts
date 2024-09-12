import {Advertisement} from "./types";

export const ORDER_STATUS_RU = new Map([
    [0, 'Создан'], [1, 'Оплачен'], [2, 'Отправлен'], [3, 'Доставлен'],
    [4, 'Получен'], [5, 'Заархивирован'], [6, 'Оформлен возврат']
])

export const advertisementObj: Advertisement = {
    id: '0',
    name: '',
    price: 0,
    createdAt: '',
    views: 0,
    likes: 0,
    imageUrl: '',
}

export const advertisementsPath = 'advertisements';
export const ordersPath = 'orders';

export const SORT_ORDER = new Map([[1, 'asc'], [2, 'desc']]);

export const BASE_URL = 'http://localhost:8000';
