import React, {FC, useState} from 'react';
import {Button, Input, Select, Space} from "antd";
import ModalBox from "../../library/ModalBox/ModalBox";
import styles from './Options.module.css';

interface IOptions {
    limit: number;
    setLimit: Function;
    searchName: string;
    setSearchName: Function;
    totalCount: number;
    handleClear: () => void;
    handleSearch: () => void;
}

const Options: FC<IOptions> = (
    {limit, setLimit, searchName, setSearchName, totalCount, handleSearch, handleClear}
) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className={styles.options}>
                <Select
                    defaultValue={limit} options={[{value: 3, label: 3},{value: 5, label: 5} ,{value: 10, label: 10}]}
                    onChange={value => setLimit(value)}
                />
                <Button type={"primary"} onClick={showModal}>Создать объявление</Button>
                <Space.Compact className={styles.options_search}>
                    <Input
                        placeholder={"Поиск по названию"} value={searchName}
                        allowClear onClear={handleClear}
                        onChange={e => setSearchName(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                    <Button type={"primary"} onClick={handleSearch}>Поиск</Button>
                </Space.Compact>
            </div>
            <ModalBox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} totalCount={totalCount}/>
        </div>
    );
};

export default Options;