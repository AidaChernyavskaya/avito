import React, {FC} from 'react';
import {Button, Select} from "antd";
import styles from './Filters.module.css';

interface IFilters {
    sortOrder: number | null;
    setSortOrder: Function;
    status: number | null;
    setStatus: Function
}

const Filters: FC<IFilters> = ({sortOrder, setSortOrder, status, setStatus}) => {
    const handleClick = () => {
        setStatus(null);
        setSortOrder(null);
    }

    return (
        <div className={styles.filters}>
            <Select
                options={[{label: 'По возрастающей', value: 1}, {label: 'По убывающей', value: 2}]}
                placeholder={'Сортировка по цене'}
                style={{width: "auto"}}
                onChange={value => setSortOrder(value)}
                value={sortOrder}

            />
            <Select
                options={[
                    {label: 'Создан', value: 1}, {label: 'Оплачен', value: 2}, {label: 'Отправлен', value: 3},
                    {label: 'Доставлен', value: 4}, {label: 'Получен', value: 5}, {label: 'Заархивирован', value: 6},
                    {label: 'Возврат', value: 7}
                ]}
                placeholder={'Выбор статуса'}
                style={{width: 'auto'}}
                onChange={value => setStatus(value)}
                value={status}

            />
            <Button type={'primary'} onClick={handleClick} className={styles.button}>Сбросить фильтры</Button>
        </div>
    );
};

export default Filters;