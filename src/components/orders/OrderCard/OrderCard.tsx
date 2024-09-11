import React, {FC, useState} from 'react';
import {Button, Typography} from "antd";
import {ORDER_STATUS_RU} from "../../../utils/constants";
import {countItemsInOrder} from "../../../utils/helpFunctions";
import {Link} from "react-router-dom";
import AdsCard from "../../advertisements/AdsCard/AdsCard";
import {Order} from "../../../types";
import {transformDateFormat} from "../../../utils/dateFunctions";

interface IOrderCard {
    order: Order;
}

const OrderCard: FC<IOrderCard> = ({order}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <div className={'order'} key={order.id}>
            <Typography.Title level={3}>Заказ N{order.id}</Typography.Title>
            <Typography.Text>Статус заказа: {ORDER_STATUS_RU[order.status]}</Typography.Text>
            <Typography.Text>Дата заказа: {transformDateFormat(order.createdAt)}</Typography.Text>
            {order.finishedAt && <Typography.Text>Дата завершения: {transformDateFormat(order.finishedAt)}</Typography.Text>}
            {order.finishedAt ? <></> : <Typography.Text>Возможно завершить: </Typography.Text>}
            <Typography.Text>Стоимость: {order.total} ₽</Typography.Text>
            <Typography.Text>Наименований товаров: {order.items.length}</Typography.Text>
            <Typography.Text>Товаров в заказе: {countItemsInOrder(order.items)}</Typography.Text>

            {isVisible && order.items.map((item, index) => (
                <div className={'order_ads_items'} key={index}>
                    <Typography.Title level={5} className={'order_ads_items__title'}>Количество товаров: {item.count}</Typography.Title>
                    <Link to={`/advertisements/${item.id}`}>
                        <AdsCard advertisement={item}/>
                    </Link>
                </div>
            ))}

            <Button type={"primary"} className={'button_show_items'} onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Скрыть товары' : 'Показать товары'}
            </Button>
        </div>
    );
};

export default OrderCard;