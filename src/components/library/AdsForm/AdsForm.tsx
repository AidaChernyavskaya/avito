import {FC} from 'react';
import {Form, FormInstance, Input, InputNumber} from "antd";

interface IProps {
    image: string;
    setImage: Function;
    name: string;
    setName: Function;
    description: string;
    setDescription: Function;
    price: number;
    setPrice: Function;
    form: FormInstance;
}

const AdsForm: FC<IProps> = ({image, setImage, name, setName, description, setDescription, price, setPrice, form}) => {
    const handleChangePrice = (value: number | null) => {
        if (value) {
            setPrice(value);
        }
    }

    return (
        <Form form={form} wrapperCol={{offset: 0}} labelCol={{span: 5}} labelAlign={"left"}>
            <Form.Item label="Изображение" name="imageUrl" initialValue={image}>
                <Input placeholder={'Вставьте ссылку на изображение'} value={image} onChange={e => setImage(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Название" name="name" initialValue={name}
                rules={[
                    {required: true, message: 'Пожалуйста, введите название товара!',},
                ]}
            >
                <Input placeholder={'Введите наименование товара'} value={name} onChange={e => setName(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Описание" name="description" initialValue={description}>
                <Input.TextArea placeholder={'Введите описание товара'} value={description} onChange={e => setDescription(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Цена" name="price" initialValue={price} rules={[
                {required: true, message: 'Пожалуйста, введите стоимость товара!',},
            ]}>
                <InputNumber
                    min={0} value={price} placeholder={'Введите стоимость'}
                    onChange={handleChangePrice} suffix={'₽'}
                />
            </Form.Item>
        </Form>
    );
};

export default AdsForm;