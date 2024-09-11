import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import {Order, OrderItem, OrderStatus} from "../types";
import OrdersService from "../API/OrdersService";
import {Button, Select, Typography} from "antd";
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
    const [status, setStatus] = useState<number | null>();
    const [sortOrder, setSortOrder] = useState<number | null>();

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders () {
        const response = await OrdersService.getAll();
        setOrdersList(response);
    }

    async function fetchOrdersByStatus () {
        if (status) {
            const response = await OrdersService.getByStatus(status - 1);
            setOrdersList(response);
        }
    }

    async function fetchOrdersByPrice () {
        if (sortOrder) {
            const response = await OrdersService.getByPrice(sortOrder === 1 ? 'asc' : 'desc');
            setOrdersList(response);
        }
    }

    useEffect(() => {
        if (sortOrder) {
            fetchOrdersByPrice();
        } else {
            fetchOrders();
        }
    }, [sortOrder])

    useEffect(() => {
        if (status){
            fetchOrdersByStatus()
        } else {
            fetchOrders();
        }
    }, [status]);

    const handleClick = () => {
        setStatus(null);
        setSortOrder(null);
    }

    return (
        <div data-testid="orders-page">
            <Navbar/>

            <Select
                options={[{label: 'По возрастающей', value: 1}, {label: 'По убывающей', value: 2}]}
                placeholder={'Сортировка по цене'}
                style={{width: 150}}
                onChange={value => setSortOrder(value)}
                value={sortOrder}

            />

            <Select
                options={[{label: 'Создан', value: 1}, {label: 'Оплачен', value: 2}, {label: 'Получен', value: 5}]}
                placeholder={'Выбор статуса'}
                style={{width: 150}}
                onChange={value => setStatus(value)}
                value={status}

            />
            <Button type={'primary'} onClick={handleClick}>Сбросить фильтры</Button>

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