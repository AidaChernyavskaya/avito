import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from "react-router-dom";
import AppRouter from "../components/AppRouter";

describe('Router test', () => {
    test('Correct links', async () => {
        render(
            <App/>
        );
        const adsLink = screen.getByTestId("ads-link");
        const ordersLink = screen.getByTestId("orders-link");
        userEvent.click(adsLink);
        await waitFor(() => {
            expect(screen.getByTestId("ads-page")).toBeInTheDocument();
        })
        userEvent.click(ordersLink);
        await waitFor(() => {
            expect(screen.getByTestId("orders-page")).toBeInTheDocument();
        })
    });

    test('Incorrect link', async () => {
        render(
            <MemoryRouter initialEntries={['/aaaaa']}>
                <AppRouter/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId('ads-page')).toBeInTheDocument();
        })
    });
})