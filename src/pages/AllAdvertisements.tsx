import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";

const AllAdvertisements = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);

    useEffect(() => {
        fetchAds();
    }, []);

    async function fetchAds () {
        const response = await AdsService.getAll();
        setAds(response);
    }

    return (
        <div data-testid="ads-page">
            <Navbar/>
            {ads.map(el => (
                <AdsCard advertisement={el}/>
            ))}
        </div>
    );
};

export default AllAdvertisements;