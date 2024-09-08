import React from 'react';
import './App.css';

function App() {
    fetch(`http://localhost:8000/advertisements`)
        .then(res => res.json())
        .then(data => console.log(data));

    return (
        <div className="App">
            Hello world
        </div>
    );
}

export default App;
