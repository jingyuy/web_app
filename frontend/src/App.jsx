import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import useAuth
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; // Import HomePage

const App = () => {
    const { isAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
                <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
