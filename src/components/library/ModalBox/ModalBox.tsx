import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Typography} from "antd";
import {Advertisement} from "../../../types";
import AdsService from "../../../API/AdsService";
import AdsForm from "../AdsForm/AdsForm";

interface IModalBox {
    isModalOpen: boolean,
    setIsModalOpen: Function,
    totalCount: number,
}

const newAdvertisement: Advertisement = {
    id: '0',
    name: '',
    price: 0,
    createdAt: '',
    views: 0,
    likes: 0,
}

const ModalBox: FC<IModalBox> = ({isModalOpen, setIsModalOpen, totalCount}) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [newAds, setNewAds] = useState<Advertisement>(newAdvertisement);

    const handleOk = () => {
        const adv = {
            id: String(totalCount + 1),
            name,
            price,
            createdAt: new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
            likes: 0,
            views: 0,
            description,
            image
        };
        form
            .validateFields()
            .then((values) => {
                setNewAds(adv);
                setPrice(0);
                setName('');
                setDescription('');
                setImage('');
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    useEffect(() => {
        if (newAds.name.length !== 0) {
            fetchNewAds();
        }
    }, [newAds])

    async function fetchNewAds () {
        return await AdsService.sendData(newAds);
    }

    const handleCancel = () => {
        setPrice(0);
        setName('');
        setDescription('');
        setImage('');
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
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
    );
};

export default ModalBox;