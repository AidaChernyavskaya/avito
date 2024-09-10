import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";
import {Link} from "react-router-dom";
import {Button, Form, Input, Modal, Pagination, Select} from "antd";

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
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
            <Modal title="Создать объявление" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} wrapperCol={{offset: 2}} labelCol={{span: 5}} labelAlign={"left"}>
                    <Form.Item label="Изображение" name="imageUrl">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Название" name="name"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите название товара!',},
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Описание" name="description">
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item label="Цена" name="price" rules={[
                        {required: true, message: 'Пожалуйста, введите стоимость товара!',},
                    ]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

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