import {render, screen} from "@testing-library/react";
import axios from 'axios';
import AllAdvertisements from "../pages/AllAdvertisements";
import {MemoryRouter} from "react-router-dom";

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
})
