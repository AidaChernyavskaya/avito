import React from 'react';
import {Header} from "antd/lib/layout/layout";
import {Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import styles from './Navbar.module.css';

const items = [
    {
        label: <Link to={'/advertisements'} className={styles.menu_item} data-testid="ads-link">Объявления</Link>,
        key: '/advertisements',
    },
    {
        label: <Link to={'/orders'} className={styles.menu_item} data-testid="orders-link">Заказы</Link>,
        key: '/orders',
    },
];

const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <Header>
            <Menu mode={'horizontal'} theme={'dark'} items={items} selectedKeys={[pathname]} className={styles.menu}/>
        </Header>
    );
};

export default Navbar;