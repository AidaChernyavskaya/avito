import React, {FC, useEffect, useState} from 'react';
import {Order} from "../types";
import OrdersService from "../API/OrdersService";
import OrderCard from "../components/orders/OrderCard/OrderCard";
import Filters from "../components/orders/Filters/Filters";
import {Typography} from "antd";
import {SORT_ORDER} from "../utils/constants";

const Orders: FC = () => {
    const [ordersList, setOrdersList] = useState<Order[]>([]);
    const [status, setStatus] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<number | null>(null);

    useEffect(() => {
        async function fetchOrders () {
            await OrdersService.get()
                .then(response => { setOrdersList(response.data) })
                .catch(error => { alert(error.message) });
        }
        async function fetchOrdersByStatus () {
            if (status){
                await OrdersService.get({status: status - 1})
                    .then(response => { setOrdersList(response.data) })
                    .catch(error => { alert(error.message) });
            }
        }
        async function fetchOrdersByPrice () {
            if (sortOrder) {
                await OrdersService.get({_sort: 'total', _order: SORT_ORDER.get(sortOrder)})
                    .then(response => { setOrdersList(response.data) })
                    .catch(error => { alert(error.message) });
            }
        }
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