import React, {FC} from 'react';
import {Button, Select} from "antd";
import styles from './Filters.module.css';

interface IProps {
    sortOrder: number | null;
    setSortOrder: Function;
    status: number | null;
    setStatus: Function
}

const priceOptions = [{label: 'По возрастающей', value: 1}, {label: 'По убывающей', value: 2}];
const statusOptions = [
    {label: 'Создан', value: 1}, {label: 'Оплачен', value: 2}, {label: 'Отправлен', value: 3},
    {label: 'Доставлен', value: 4}, {label: 'Получен', value: 5}, {label: 'Заархивирован', value: 6},
    {label: 'Возврат', value: 7}
];

const Filters: FC<IProps> = ({sortOrder, setSortOrder, status, setStatus}) => {
    const handleResetFilters = () => {
        setStatus(null);
        setSortOrder(null);
    }

    return (
        <div className={styles.filters}>
            <Select
                options={priceOptions}
                placeholder={'Сортировка по цене'}
                style={{width: "auto"}}
                onChange={value => setSortOrder(value)}
                value={sortOrder}

            />
            <Select
                options={statusOptions}
                placeholder={'Выбор статуса'}
                style={{width: 'auto'}}
                onChange={value => setStatus(value)}
                value={status}

            />
            <Button type={'primary'} onClick={handleResetFilters} className={styles.button}>Сбросить фильтры</Button>
        </div>
    );
};

export default Filters;