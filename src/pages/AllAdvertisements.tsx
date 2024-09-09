import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import ImageIcon from "../static/image_icon.svg";
import {Image, Typography} from "antd";
import {EyeTwoTone, HeartTwoTone} from "@ant-design/icons";

const AllAdvertisements = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);

    useEffect(() => {
        fetchAds();
    }, []);

    async function fetchAds () {
        const response = await AdsService.getAll();
        setAds(response);
    }

    return (
        <div data-testid="ads-page">
            <Navbar/>
            {ads.map(el => (
                <div key={el.id} className={'advertisement'}>
                    <Image
                        alt={'Фото товара'} title={'Фото товара'}
                        src={el.imageUrl} fallback={ImageIcon}
                        width={200} height={200}
                    />
                    <div className={'advertisement_info'}>
                        <Typography.Title level={3}>{el.name}</Typography.Title>
                        <Typography.Title level={4}>{el.price} ₽</Typography.Title>
                        <div className={'advertisement_stats'}>
                            <div className={'advertisement_stats__elem'}>
                                <HeartTwoTone twoToneColor="#eb2f96" className={'icon'}/>
                                <Typography.Title level={5}>{el.likes}</Typography.Title>
                            </div>
                            <div className={'advertisement_stats__elem'} >
                                <EyeTwoTone className={'icon'}/>
                                <Typography.Title level={5}>{el.views}</Typography.Title>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllAdvertisements;