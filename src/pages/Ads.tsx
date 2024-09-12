import React, {useEffect, useState} from 'react';
import { Advertisement} from "../types";
import AdsService from "../API/AdsService";
import {Button} from "antd";
import AdsCardFull from "../components/advertisements/AdsCardFull/AdsCardFull";
import ModalBox from "../components/library/ModalBox/ModalBox";
import {newAdvertisement} from "../utils/constants";

const getAdsId = () => {
    const pathname = window.location.pathname;
    return Number(pathname.split('/')[2]);
}

const Ads = () => {
    const [ads, setAds] = useState<Advertisement>(newAdvertisement);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        async function fetchAdvertisement () {
            await AdsService.getById(getAdsId())
                .then(response => { setAds(response.data) })
                .catch(error => { alert(error.message) });
        }

        fetchAdvertisement();
    }, [])

    const handleClick = () => {
        setIsModalOpen(true)
    }

    return (
        <div data-testid="advertisement-page">
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