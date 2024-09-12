import {Advertisement} from "../types";

export const ORDER_STATUS_RU = {
    0: 'Создан',
    1: 'Оплачен',
    2: 'Отправлен',
    3: 'Доставлен',
    4: 'Получен',
    5: 'Заархивирован',
    6: 'Оформлен возврат'
};


export const newAdvertisement: Advertisement = {
    id: '0',
    name: '',
    price: 0,
    createdAt: '',
    views: 0,
    likes: 0,
    imageUrl: '',
}