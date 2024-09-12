import {render, screen} from "@testing-library/react";
import axios from 'axios';
import AllAdvertisements from "../pages/AllAdvertisements";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Ads from "../pages/Ads";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Test AllAds', () => {
    let response: any;
    beforeEach(() => {
        response = { data: [
            {
                "id": "1",
                "name": "Стул",
                "description": "Очень красивый",
                "price": 2001,
                "createdAt": "2022-08-12T20:16:55.351Z",
                "views": 20,
                "likes": 2,
                "imageUrl": ""
            },
            {
                "id": "2",
                "name": "Ведро снега",
                "description": "Последняя возможность купить по выгодной цене!",
                "price": 3000,
                "createdAt": "2023-08-12T20:16:55.351Z",
                "views": 77832,
                "likes": 45666,
                "imageUrl": ""
            },],
            headers: {
            'x-total-count': 2
            }
        }

    })
    test('render allAds', async () => {
        mockedAxios.get.mockResolvedValue(response);
        render(
            <MemoryRouter>
                <AllAdvertisements/>
            </MemoryRouter>
        )
        const ads = await screen.findAllByTestId('allAds-item');
        expect(ads.length).toBe(2);
        expect(axios.get).toBeCalledTimes(1);
        screen.debug();
    });
    test('test redirect for more details', async () => {
        mockedAxios.get.mockResolvedValue(response);
        render(
            <MemoryRouter initialEntries={['/advertisements']}>
                <Routes>
                    <Route path="/advertisements" element={<AllAdvertisements/>} />
                    <Route path="/advertisements/:id" element={<Ads/>} />
                </Routes>
            </MemoryRouter>
        );
        const ads = await screen.findAllByTestId('allAds-item');
        expect(ads.length).toBe(2);
        userEvent.click(ads[0]);
        expect(screen.getByTestId('advertisement-page')).toBeInTheDocument();
    });
})
