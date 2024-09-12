import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Modal} from "antd";
import {Advertisement} from "../../../types";
import AdsService from "../../../API/AdsService";
import AdsForm from "../AdsForm/AdsForm";
import {advertisementObj} from "../../../utils/constants";

interface IProps {
    isModalOpen: boolean,
    setIsModalOpen: Function,
    totalCount?: number,
    ads?: Advertisement,
    setAds?: Function,
}

const ModalBox: FC<IProps> = (
    { isModalOpen, setIsModalOpen, totalCount= 0, ads, setAds }
) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [newAds, setNewAds] = useState<Advertisement>(advertisementObj);

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
            totalCount++;
            adv = {
                id: String(totalCount),
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
            .then(() => {
                if (ads && setAds) {
                    const fetchEditAds = async (newAds: Advertisement) => {
                        await AdsService.editAdvertisement(newAds)
                            .catch(error => { alert(error.message) });
                    }
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
        async function fetchNewAds () {
            await AdsService.createAdvertisement(newAds)
                .catch(error => { alert(error.message) });
        }

        if (newAds.name.length !== 0) {
            fetchNewAds();
        }
    }, [newAds])

    useEffect(() => {
        setProperties(ads);
    }, [ads])

    const setProperties = (advertisement?: Advertisement) => {
        setImage(advertisement?.imageUrl ? advertisement.imageUrl : '');
        setName(advertisement?.name ? advertisement.name : '');
        setDescription(advertisement?.description ? advertisement.description : '');
        setPrice(advertisement?.price ? advertisement.price : 0);
    }

    const handleCancel = () => {
        setProperties(ads);
        if (!ads) {form.resetFields()}
        setIsModalOpen(false);
    };

    return (
        <Modal
            title={`${ads ? 'Редактировать' : 'Создать'} объявление`} open={isModalOpen}
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