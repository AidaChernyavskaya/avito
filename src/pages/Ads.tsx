import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import { Advertisement} from "../types";
import AdsService from "../API/AdsService";
import ImageIcon from "../static/image_icon.svg";
import {Button, Image, Typography} from "antd";

const getAdsId = () => {
    const pathname = window.location.pathname;
    return Number(pathname.split('/')[2]);
}

const Ads = () => {
    const [ads, setAds] = useState<Advertisement>();

    useEffect(() => {
        fetchAdvertisement();
    }, [])

    async function fetchAdvertisement () {
        const response = await AdsService.getById(getAdsId());
        setAds(response);
    }

    return (
        <div data-testid="advertisement-page">
            <Navbar/>
            <div className={'ads'}>
                <Image
                    alt={'Фото товара'} title={'Фото товара'}
                    src={ads?.imageUrl} fallback={ImageIcon}
                    width={200} height={200}
                />
                <div>
                    <Typography.Title level={3}>{ads?.name}</Typography.Title>
                    <Typography.Title level={4}>{ads?.price} ₽</Typography.Title>
                    <Typography.Text>{ads?.description}</Typography.Text>
                    <div>
                        <Typography.Text>Лайков: </Typography.Text>
                        <Typography.Text>{ads?.likes}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Просмотров: </Typography.Text>
                        <Typography.Text>{ads?.likes}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Дата публикации: </Typography.Text>
                        <Typography.Text>{ads?.createdAt}</Typography.Text>
                    </div>
                </div>
            </div>
            <div className={'button_edit'}>
                <Button type={"primary"}  size={"large"} >Редактировать объявление</Button>
            </div>

        </div>
    );
};

export default Ads;