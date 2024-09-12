import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from "react-router-dom";
import AppRouter from "../components/router/AppRouter";
import '@testing-library/jest-dom'

describe('Router test', () => {
    test('Correct links', async () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );
        const adsLink = screen.getByTestId("ads-link");
        const ordersLink = screen.getByTestId("orders-link");
        userEvent.click(adsLink);
        expect(screen.getByTestId("ads-page")).toBeInTheDocument();
        userEvent.click(ordersLink);
        expect(screen.getByTestId("orders-page")).toBeInTheDocument();
    });

    test('Incorrect link', async () => {
        render(
            <MemoryRouter initialEntries={['/aaaaa']}>
                <AppRouter/>
            </MemoryRouter>
        );
        expect(screen.getByTestId('ads-page')).toBeInTheDocument();
    });
})