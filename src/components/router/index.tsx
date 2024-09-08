import AllAdvertisements from "../../pages/AllAdvertisements";
import Orders from "../../pages/Orders";
import Advertisement from "../../pages/Advertisement";

interface IRoute {
    path: string,
    element: JSX.Element;
}

export const routes: Array<IRoute> = [
    {path: '/advertisements', element: <AllAdvertisements/>},
    {path: '/advertisements/:id', element: <Advertisement/>},
    {path: '/orders', element: <Orders/>},
]