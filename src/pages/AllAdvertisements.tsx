import React, {useEffect, useState} from 'react';
import Navbar from "../components/library/Navbar/Navbar";
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";
import {Link} from "react-router-dom";
import {Pagination} from "antd";
import Options from "../components/advertisements/Options/Options";

const AllAdvertisements = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [searchName, setSearchName] = useState<string>('');

    useEffect(() => {
        fetchAds(limit, page);
    }, [page, limit]);

    async function fetchAds (limit: number, page: number) {
        const response = await AdsService.getAll(limit, page);
        setAds(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalCount(totalCount);
    }

    async function fetchByName (name: string) {
        const response = await AdsService.getByName(name);
        setAds(response);
        setTotalCount(response.length);
    }

    const changePage = (page: number) => {
        setPage(page);
        window.scrollBy({
            top: -window.innerWidth,
            behavior : "smooth"
        });
    }

    const handleSearch = () => {
        fetchByName(searchName);
    }

    const handleClear = () => {
        fetchAds(limit, page);
    }

    return (
        <div data-testid="ads-page">
            <Navbar/>
            <Options
                limit={limit} setLimit={setLimit}
                searchName={searchName} setSearchName={setSearchName}
                totalCount={totalCount} handleClear={handleClear} handleSearch={handleSearch}
            />
            {ads?.map(el => (
                <Link to={`/advertisements/${el.id}`} key={el.id}>
                    <AdsCard advertisement={el}/>
                </Link>
            ))}
            <Pagination
                align={'center'} defaultCurrent={1}
                pageSize={limit} total={totalCount} responsive={true}
                onChange={changePage}
            />
        </div>
    );
};

export default AllAdvertisements;