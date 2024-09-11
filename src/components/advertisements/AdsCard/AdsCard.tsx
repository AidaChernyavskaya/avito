import React, {FC} from 'react';
import {Image, Typography} from "antd";
import ImageIcon from "../../../static/image_icon.svg";
import {EyeTwoTone, HeartTwoTone} from "@ant-design/icons";
import {Advertisement} from "../../../types";
import styles from "./AdsCard.module.css";

interface IAdsCard {
    advertisement: Advertisement;
}

const AdsCard: FC<IAdsCard> = ({advertisement, ...props}) => {
    return (
        <div className={styles.advertisement}>
            <Image
                alt={'Фото товара'} title={'Фото товара'}
                src={advertisement.imageUrl} fallback={ImageIcon}
                className={styles.advertisement_img}
            />
            <div className={styles.advertisement_info}>
                <Typography.Title level={3}>{advertisement.name}</Typography.Title>
                <Typography.Title level={4}>{advertisement.price} ₽</Typography.Title>
                <div className={styles.advertisement_stats}>
                    <div className={styles.advertisement_stats__elem}>
                        <HeartTwoTone twoToneColor="#eb2f96" className={styles.icon}/>
                        <Typography.Title level={5}>{advertisement.likes}</Typography.Title>
                    </div>
                    <div className={styles.advertisement_stats__elem} >
                        <EyeTwoTone className={styles.icon}/>
                        <Typography.Title level={5}>{advertisement.views}</Typography.Title>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsCard;