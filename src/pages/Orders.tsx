import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import {Order, OrderItem, OrderStatus} from "../types";
import OrdersService from "../API/OrdersService";
import {Button, Typography} from "antd";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";
import {Link} from "react-router-dom";

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
    const [isVisible, setIsVisible] = useState<boolean>(false);

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
                <div className={'order'} key={order.id}>
                    <Typography.Title level={3}>Заказ N{order.id}</Typography.Title>
                    <Typography.Text>Статус заказа: {ORDER_STATUS_RU[order.status]}</Typography.Text>
                    <Typography.Text>Дата заказа: {order.createdAt}</Typography.Text>
                    {order.finishedAt && <Typography.Text>Дата завершения: {order.finishedAt}</Typography.Text>}
                    {order.finishedAt ? <></> : <Typography.Text>Возможно завершить: </Typography.Text>}
                    <Typography.Text>Стоимость: {order.total} ₽</Typography.Text>
                    <Typography.Text>Наименований товаров: {order.items.length}</Typography.Text>
                    <Typography.Text>Товаров в заказе: {countItemsInOrder(order.items)}</Typography.Text>

                    {isVisible && order.items.map(item => (
                        <div className={'order_ads_items'}>
                            <Typography.Title level={5} className={'order_ads_items__title'}>Количество товаров: {item.count}</Typography.Title>
                            <Link to={`/advertisements/${item.id}`}>
                                <AdsCard advertisement={item}/>
                            </Link>
                        </div>
                    ))}

                    <Button type={"primary"} className={'button_show_items'} onClick={() => setIsVisible(!isVisible)}>
                        Показать товары
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default Orders;