import React, {useEffect, useState} from 'react';
import AdsService from "../API/AdsService";
import {Advertisement} from "../types";
import AdsCard from "../components/advertisements/AdsCard/AdsCard";
import {Link} from "react-router-dom";
import {Pagination, Typography} from "antd";
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
        await AdsService.getByParams({_limit: limit, _page: page})
            .then(response => {
                setAds(response.data);
                setTotalCount(response.headers['x-total-count']);
            })
            .catch(error => { alert(error.message) });
    }

    async function fetchByName (name: string) {
        await AdsService.getByParams({name_like: name})
            .then(response => {
                setAds(response.data);
                setTotalCount(response.data.length);
            })
            .catch(error => { alert(error.message) });
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
            <Options
                limit={limit} setLimit={setLimit}
                searchName={searchName} setSearchName={setSearchName}
                totalCount={totalCount} handleClear={handleClear} handleSearch={handleSearch}
            />
            {
                ads.length === 0
                    ? <Typography.Title level={3} className={'feedback'}>Не найдено</Typography.Title>
                    : <div>
                        {ads?.map(el => (
                            <Link to={`/advertisements/${el.id}`} key={el.id}>
                                <AdsCard advertisement={el}/>
                            </Link>
                        ))}
                        <Pagination
                            align={'center'} defaultCurrent={1}
                            pageSize={limit} total={totalCount} responsive={true}
                            onChange={changePage} className={'pagination'}
                        />
                    </div>
            }
        </div>
    );
};

export default AllAdvertisements;