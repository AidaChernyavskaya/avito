import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Modal} from "antd";
import {Advertisement} from "../../../types";
import AdsService from "../../../API/AdsService";
import AdsForm from "../AdsForm/AdsForm";
import {newAdvertisement} from "../../../utils/initializeObjects";

interface IModalBox {
    isModalOpen: boolean,
    setIsModalOpen: Function,
    totalCount: number,
    ads?: Advertisement,
    setAds?: Function,
    title: string,
}

const ModalBox: FC<IModalBox> = ({isModalOpen, setIsModalOpen, totalCount, ads, setAds, title}) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [newAds, setNewAds] = useState<Advertisement>(newAdvertisement);

    const handleOk = () => {
        let adv: Advertisement;
        if (ads) {
            adv = {
                ...ads,
                name,
                imageUrl: image,
                description,
                price
            }
        } else {
            adv = {
                id: String(totalCount + 1),
                name,
                price,
                createdAt: String(new Date()),
                likes: 0,
                views: 0,
                description,
                imageUrl: image
            };
        }
        form
            .validateFields()
            .then((values) => {
                if (ads && setAds) {
                    fetchEditAds(adv);
                    setAds(adv);
                } else {
                    setNewAds(adv);
                    form.resetFields();
                }
                setProperties(ads);
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

    useEffect(() => {
        setProperties(ads);
    }, [ads])

    async function fetchNewAds () {
        return await AdsService.sendData(newAds);
    }

    async function fetchEditAds (newAds: Advertisement) {
        return await AdsService.editData(newAds)
    }

    const setProperties = (ads?: Advertisement) => {
        setImage(ads?.imageUrl ? ads.imageUrl : '');
        setName(ads?.name ? ads.name : '');
        setDescription(ads?.description ? ads.description : '');
        setPrice(ads?.price ? ads.price : 0);
    }

    const handleCancel = () => {
        setProperties(ads);
        if (!ads) {form.resetFields()}
        setIsModalOpen(false);
    };

    return (
        <Modal
            title={title} open={isModalOpen}
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