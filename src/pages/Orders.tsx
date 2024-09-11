import React, {FC, useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import {Order} from "../types";
import OrdersService from "../API/OrdersService";
import OrderCard from "../components/orders/OrderCard/OrderCard";
import Filters from "../components/orders/Filters/Filters";
import {Typography} from "antd";

const Orders: FC = () => {
    const [ordersList, setOrdersList] = useState<Order[]>([]);
    const [status, setStatus] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<number | null>(null);

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

    // useEffect(() => {
    //     fetchOrders();
    // }, [])
    //
    // useEffect(() => {
    //     if (sortOrder) {
    //         fetchOrdersByPrice();
    //     } else {
    //         fetchOrders();
    //     }
    // }, [sortOrder])
    //
    // useEffect(() => {
    //     if (status){
    //         fetchOrdersByStatus()
    //     } else {
    //         fetchOrders();
    //     }
    // }, [status]);

    useEffect(() => {
        if (sortOrder) {
            fetchOrdersByPrice();
        }
        if (status) {
            fetchOrdersByStatus()
        }
        if (!sortOrder && !status) {
            fetchOrders();
        }
    }, [sortOrder, status])

    return (
        <div data-testid="orders-page">
            <Navbar/>
            <Filters sortOrder={sortOrder} setSortOrder={setSortOrder} status={status} setStatus={setStatus}/>
            {
                ordersList.length === 0
                    ? <Typography.Title level={3} className={'feedback'}>Не найдено</Typography.Title>
                    : ordersList.map(order => (
                        <OrderCard order={order} key={order.id}/>
                    ))
            }
        </div>
    );
};

export default Orders;