import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";
import {Link} from "react-router-dom";
import {Button, Form, Input, Modal, Pagination, Select, Space} from "antd";
import ModalBox from "../components/library/ModalBox/ModalBox";



const AllAdvertisements = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);

    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);

    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        fetchAds(limit, page);
    }, [page, limit]);

    async function fetchAds (limit: number, page: number) {
        const response = await AdsService.getAll(limit, page);
        setAds(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalCount(totalCount);
    }

    const changePage = (page: number) => {
        setPage(page);
        // window.scrollTo(0, 0);
        window.scrollBy({
            top: -window.innerWidth,
            behavior : "smooth"
        });
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function fetchByName (name: string) {
        const response = await AdsService.getByName(name);
        setAds(response);
        setTotalCount(response.length);
    }

    const handleSearch = () => {
        fetchByName(searchName);
    }


    return (
        <div data-testid="ads-page">
            <Navbar/>
            <div className={'options'}>
                <Select
                    defaultValue={limit} options={[{value: 3, label: 3},{value: 5, label: 5} ,{value: 10, label: 10}]}
                    onChange={value => setLimit(value)}
                />
                <Button type={"primary"} onClick={showModal}>Создать объявление</Button>
                <Space.Compact>
                    <Input
                        placeholder={"Поиск по названию"} value={searchName}
                        allowClear onClear={() => fetchAds(limit, page)}
                        onChange={e => setSearchName(e.target.value)}/>
                    <Button type={"primary"} onClick={handleSearch}>Поиск</Button>
                </Space.Compact>
            </div>
            <ModalBox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} totalCount={totalCount}/>

            {ads?.map(el => (
                <Link to={`/advertisements/${el.id}`} key={el.id}>
                    <AdsCard advertisement={el}/>
                </Link>
            ))}
            <Pagination
                align={'center'} defaultCurrent={1}
                pageSize={limit} total={totalCount} responsive={true}
                onChange={changePage}
            />
        </div>
    );
};

export default AllAdvertisements;