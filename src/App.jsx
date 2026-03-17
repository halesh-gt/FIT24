import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import RegisterPage from './components/RegisterPage';
import AdminLogin from './components/AdminLogin';
import AdminReset from './components/AdminReset';

const RequireAdmin = ({ children }) => {
    const authed =
        typeof window !== 'undefined' &&
        localStorage.getItem('isAdminAuthed') === 'true';
    return authed ? children : <Navigate to="/admin-login" replace />;
};

function App() {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <>
            <Routes>
                {/* Public site */}
                <Route path="/" element={<Home />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-reset" element={<AdminReset />} />

                {/* Admin dashboards (protected) */}
                <Route
                    path="/admin"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="dashboard" />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="users" />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/payments"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="payments" />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/plans"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="plans" />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/trainers"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="trainers" />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/member-forms"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="memberForms" />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/whatsapp-leads"
                    element={
                        <RequireAdmin>
                            <Admin initialTab="whatsappLeads" />
                        </RequireAdmin>
                    }
                />
            </Routes>

            {!isAdminPage && <Chatbot />}
        </>
    );
}

export default App;
