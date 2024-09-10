import React, {FC} from 'react';
import {Button, Form, Input, Modal} from "antd";

interface IModalBox {
    isModalOpen: boolean,
    setIsModalOpen: Function,
}

const ModalBox: FC<IModalBox> = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
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
    );
};

export default ModalBox;