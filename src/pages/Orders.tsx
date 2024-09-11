import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import {Order, OrderItem, OrderStatus} from "../types";
import OrdersService from "../API/OrdersService";
import {Typography} from "antd";

function getKeyByValue(object: any, value: number) {
    return Object.keys(object).find(key => object[key] === value);
}

function countItemsInOrder (items: OrderItem[]) {
    let count = 0;
    items.map(item => {count += item.count})
    return count;
}

const ORDER_STATUS_RU = ['Создан', 'Оплачен', 'Отправлен', 'Доставлен', 'Получен', 'Заархивирован', 'Оформлен возврат'];

const Orders = () => {
    const [ordersList, setOrdersList] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders () {
        const response = await OrdersService.getAll();
        setOrdersList(response);
    }

    return (
        <div data-testid="orders-page">
            <Navbar/>
            {ordersList.map(order => (
                <div className={'order'}>
                    <Typography.Title level={3}>Заказ N{order.id}</Typography.Title>
                    <Typography.Text>Статус заказа: {ORDER_STATUS_RU[order.status]}</Typography.Text>
                    <Typography.Text>Дата заказа: {order.createdAt}</Typography.Text>
                    {order.finishedAt && <Typography.Text>Дата завершения: {order.finishedAt}</Typography.Text>}
                    {order.finishedAt ? <></> : <Typography.Text>Возможно завершить: </Typography.Text>}
                    <Typography.Text>Стоимость: {order.total} ₽</Typography.Text>
                    <Typography.Text>Наименований товаров: {order.items.length}</Typography.Text>
                    <Typography.Text>Товаров в заказе: {countItemsInOrder(order.items)}</Typography.Text>
                </div>
            ))}
        </div>
    );
};

export default Orders;