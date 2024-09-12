import React, {FC, useState} from 'react';
import {Button, Typography} from "antd";
import {ORDER_STATUS_RU} from "../../../utils/constants";
import {countItemsInOrder} from "../../../utils/helpFunctions";
import {Link} from "react-router-dom";
import AdsCard from "../../advertisements/AdsCard/AdsCard";
import {Order} from "../../../types";
import {transformDateFormat} from "../../../utils/dateFunctions";
import styles from './OrderCard.module.css';

interface IProps {
    order: Order;
}

const OrderCard: FC<IProps> = ({order}) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggleIsVisible = () => {
        setIsVisible(prev => !prev)
    }

    return (
        <div className={styles.order} key={order.id} data-testid="orders-item">
            <Typography.Title level={3}>Заказ N{order.id}</Typography.Title>
            <Typography.Text>Статус заказа: {ORDER_STATUS_RU.get(order.status)}</Typography.Text>
            <Typography.Text>Дата заказа: {transformDateFormat(order.createdAt)}</Typography.Text>
            {order.finishedAt && <Typography.Text>Дата завершения: {transformDateFormat(order.finishedAt)}</Typography.Text>}
            {!order.finishedAt && <Typography.Text>Возможно завершить: </Typography.Text>}
            <Typography.Text>Стоимость: {order.total} ₽</Typography.Text>
            <Typography.Text>Наименований товаров: {order.items.length}</Typography.Text>
            <Typography.Text>Товаров в заказе: {countItemsInOrder(order.items)}</Typography.Text>

            {isVisible && order.items.map((item, index) => (
                <div className={styles.order_ads_items} key={index}>
                    <Typography.Title level={5} className={styles.order_ads_items__title}>Количество товаров: {item.count}</Typography.Title>
                    <Link to={`/advertisements/${item.id}`}>
                        <AdsCard advertisement={item}/>
                    </Link>
                </div>
            ))}

            <Button type={"primary"} className={styles.button_show_items} onClick={handleToggleIsVisible}>
                {`${isVisible ? 'Скрыть' : 'Показать'} товары`}
            </Button>
        </div>
    );
};

export default OrderCard;