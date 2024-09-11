import React, {FC, useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import {Order, OrderItem} from "../types";
import OrdersService from "../API/OrdersService";
import {Button, Select, Typography} from "antd";
import OrderCard from "../components/orders/OrderCard/OrderCard";

const Orders: FC = () => {
    const [ordersList, setOrdersList] = useState<Order[]>([]);

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
                <OrderCard order={order} key={order.id}/>
            ))}
        </div>
    );
};

export default Orders;