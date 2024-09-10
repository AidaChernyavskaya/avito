import AllAdvertisements from "../../pages/AllAdvertisements";
import Orders from "../../pages/Orders";
import Ads from "../../pages/Ads";

interface IRoute {
    path: string,
    element: JSX.Element;
}

export const routes: Array<IRoute> = [
    {path: '/advertisements', element: <AllAdvertisements/>},
    {path: '/advertisements/:id', element: <Ads/>},
    {path: '/orders', element: <Orders/>},
]