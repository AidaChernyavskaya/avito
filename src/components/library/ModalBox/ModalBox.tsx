import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Typography} from "antd";
import {Advertisement} from "../../../types";
import AdsService from "../../../API/AdsService";

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

    const onChangePrice = (value: number | null) => {
        if (value) {
            setPrice(value);
        }
    }

    return (
        <Modal
            title="Создать объявление" open={isModalOpen}
            onOk={handleOk} onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>Назад</Button>,
                <Button key="submit" type="primary" onClick={handleOk}>Сохранить</Button>,
            ]}
        >
            <Form form={form} wrapperCol={{offset: 2}} labelCol={{span: 5}} labelAlign={"left"}>
                <Form.Item label="Изображение" name="imageUrl">
                    <Input placeholder={'Вставьте ссылку на изображение'} value={image} onChange={e => setImage(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Название" name="name"
                    rules={[
                        {required: true, message: 'Пожалуйста, введите название товара!',},
                    ]}
                >
                    <Input placeholder={'Введите наименование товара'} value={name} onChange={e => setName(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Описание" name="description">
                    <Input.TextArea placeholder={'Введите описание товара'} value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Цена" name="price" rules={[
                    {required: true, message: 'Пожалуйста, введите стоимость товара!',},
                ]}>
                    <InputNumber
                        min={0} value={price} placeholder={'Введите стоимость'}
                        onChange={onChangePrice} suffix={'₽'}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalBox;