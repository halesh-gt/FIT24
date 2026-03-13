import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import RegisterPage from './components/RegisterPage';

function App() {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>

            {!isAdminPage && <Chatbot />}
        </>
    );
}

export default App;
