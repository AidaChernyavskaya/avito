import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../library/Layout";
import AllAdvertisements from "../../pages/AllAdvertisements";
import Ads from "../../pages/Ads";
import Orders from "../../pages/Orders";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<AllAdvertisements/>}/>
                <Route path={"advertisements"} element={<AllAdvertisements/>}/>
                <Route path={"advertisements/:id"} element={<Ads/>}/>
                <Route path={"orders"} element={<Orders/>}/>
                <Route path="*" element={<Navigate replace to="/advertisements"/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;