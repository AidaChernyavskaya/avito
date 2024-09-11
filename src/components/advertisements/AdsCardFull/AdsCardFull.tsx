import React, {FC} from 'react';
import {Image, Typography} from "antd";
import ImageIcon from "../../../static/image_icon.svg";
import {Advertisement} from "../../../types";
import styles from './AdsCardFull.module.css';
import {transformDateFormat} from "../../../utils/dateFunctions";

interface IAdsCardFull {
    ads: Advertisement;
}

const AdsCardFull: FC<IAdsCardFull> = ({ads}) => {
    return (
        <div className={styles.ads}>
            <Image
                alt={'Фото товара'} title={'Фото товара'}
                src={ads?.imageUrl} fallback={ImageIcon}
            />
            <div className={styles.ads_info}>
                <Typography.Title level={3}>{ads.name}</Typography.Title>
                <Typography.Title level={4}>{ads.price} ₽</Typography.Title>
                <Typography.Paragraph
                    ellipsis={{rows:3, expandable: true, symbol: 'Развернуть'}}
                >
                    {ads.description}
                </Typography.Paragraph>
                <div>
                    <Typography.Text>Лайков: </Typography.Text>
                    <Typography.Text>{ads.likes}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>Просмотров: </Typography.Text>
                    <Typography.Text>{ads.likes}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>Дата публикации: </Typography.Text>
                    <Typography.Text>{transformDateFormat(ads.createdAt)}</Typography.Text>
                </div>
            </div>
        </div>
    );
};

export default AdsCardFull;