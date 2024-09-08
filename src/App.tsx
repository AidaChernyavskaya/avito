import React from 'react';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
    fetch(`http://localhost:8000/advertisements`)
        .then(res => res.json())
        .then(data => console.log(data));

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
