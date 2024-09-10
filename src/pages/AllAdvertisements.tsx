import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";
import {Link} from "react-router-dom";
import {Button, Form, Input, Modal, Pagination, Select} from "antd";
import ModalBox from "../components/library/ModalBox/ModalBox";



const AllAdvertisements = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);

    const [perPage, setPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        fetchAds(perPage, page);
    }, [page, perPage]);

    async function fetchAds (limit: number, page: number) {
        const response = await AdsService.getAll(limit, page);
        setAds(response.data);
        const totalCount = response.items;
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


    return (
        <div data-testid="ads-page">
            <Navbar/>
            <div className={'options'}>
                <Select
                    defaultValue={perPage} options={[{value: 3, label: 3},{value: 5, label: 5} ,{value: 10, label: 10}]}
                    onChange={value => setPerPage(value)}
                />
                <Button type={"primary"} onClick={showModal}>Создать объявление</Button>
            </div>
            <ModalBox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} totalCount={totalCount}/>

            {ads.map(el => (
                <Link to={`/advertisements/${el.id}`} key={el.id}>
                    <AdsCard advertisement={el}/>
                </Link>
            ))}
            <Pagination
                align={'center'} defaultCurrent={1}
                pageSize={perPage} total={totalCount} responsive={true}
                onChange={changePage}
            />
        </div>
    );
};

export default AllAdvertisements;