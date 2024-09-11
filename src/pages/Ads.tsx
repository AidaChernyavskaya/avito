import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import { Advertisement} from "../types";
import AdsService from "../API/AdsService";
import {Button, Form, Modal, Typography} from "antd";
import AdsForm from "../components/library/AdsForm/AdsForm";
import AdsCardFull from "../components/advertisements/AdsCardFull/AdsCardFull";

const getAdsId = () => {
    const pathname = window.location.pathname;
    return Number(pathname.split('/')[2]);
}

const newAdvertisement: Advertisement = {
    id: '0',
    name: '',
    price: 0,
    createdAt: '',
    views: 0,
    likes: 0,
    imageUrl: '',
}

const Ads = () => {
    const [ads, setAds] = useState<Advertisement>(newAdvertisement);
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchAdvertisement();
    }, [])

    async function fetchAdvertisement () {
        const response = await AdsService.getById(getAdsId());
        setAds(response);
        setImage(response.imageUrl);
        setName(response.name);
        setDescription(response.description ? response.description : '');
        setPrice(response.price);
    }

    async function fetchEditAds (newAds: Advertisement) {
        return await AdsService.editData(newAds)
    }

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setImage(ads.imageUrl ? ads.imageUrl : '');
        setName(ads.name);
        setDescription(ads.description ? ads.description : '');
        setPrice(ads.price);
        setIsModalOpen(false);
    }

    const handleOk = () => {
        const newAds = {
            ...ads,
            name,
            imageUrl: image,
            description,
            price
        }
        fetchEditAds(newAds);
        setAds(newAds);
        setIsModalOpen(false);
    }

    useEffect(() => {
        setImage(ads.imageUrl ? ads.imageUrl : '');
        setName(ads.name);
        setDescription(ads.description ? ads.description : '');
        setPrice(ads.price);
    }, [ads])

    return (
        <div data-testid="advertisement-page">
            <Navbar/>
            <AdsCardFull ads={ads}/>
            <div className={'button_edit'}>
                <Button type={"primary"}  size={"large"} onClick={handleClick}>Редактировать объявление</Button>
            </div>

            <Modal
                title="Создать объявление" open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Назад</Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>Сохранить</Button>,
                ]}
            >
                <AdsForm
                    image={image} setImage={setImage}
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    price={price} setPrice={setPrice} form={form}
                />
            </Modal>
        </div>
    );
};

export default Ads;