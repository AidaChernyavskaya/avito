import {render, screen, waitFor} from "@testing-library/react";
import axios from 'axios';
import {MemoryRouter} from "react-router-dom";
import Orders from "../pages/Orders";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Test Orders', () => {
    let response: any;
    beforeEach(() => {
        response = {data: [
            {
                "id": "1",
                "status": 0,
                "createdAt": "2024-08-12T20:20:55.351Z",
                "finishedAt": "",
                "total": 314000,
                "deliveryWay": "mail",
                "items": [
                    {
                        "id": "8",
                        "name": "Новый айфон",
                        "price": 100000,
                        "createdAt": "2024-08-12T12:16:55.351Z",
                        "views": 200000,
                        "likes": 302,
                        "imageUrl": "",
                        "count": 3
                    },
                    {
                        "id": "6",
                        "name": "Картонная коробка",
                        "description": "Почная.",
                        "price": 7000,
                        "createdAt": "2024-04-12T20:16:55.351Z",
                        "views": 1,
                        "likes": 0,
                        "imageUrl": "",
                        "count": 2
                    }
                ]
            },
        ]}
    })
    test('render Orders', async () => {
        mockedAxios.get.mockResolvedValue(response);
        render(
            <MemoryRouter>
                <Orders/>
            </MemoryRouter>
        )
        const ads = await screen.findAllByTestId('orders-item');
        expect(ads.length).toBe(1);
        expect(axios.get).toBeCalledTimes(1);
        screen.debug();
    });
})
