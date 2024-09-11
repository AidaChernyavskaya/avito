import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import { Advertisement} from "../types";
import AdsService from "../API/AdsService";
import {Button} from "antd";
import AdsCardFull from "../components/advertisements/AdsCardFull/AdsCardFull";
import ModalBox from "../components/library/ModalBox/ModalBox";
import {newAdvertisement} from "../utils/initializeObjects";

const getAdsId = () => {
    const pathname = window.location.pathname;
    return Number(pathname.split('/')[2]);
}

const Ads = () => {
    const [ads, setAds] = useState<Advertisement>(newAdvertisement);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        fetchAdvertisement();
    }, [])

    async function fetchAdvertisement () {
        const response = await AdsService.getById(getAdsId());
        setAds(response);
    }

    const handleClick = () => {
        setIsModalOpen(true)
    }

    return (
        <div data-testid="advertisement-page">
            <Navbar/>
            <AdsCardFull ads={ads}/>
            <div className={'button_edit'}>
                <Button type={"primary"}  size={"large"} onClick={handleClick}>Редактировать объявление</Button>
            </div>

            <ModalBox
                isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                totalCount={0} ads={ads} setAds={setAds} title={'Редактировать объявление'}
            />
        </div>
    );
};

export default Ads;