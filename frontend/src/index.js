import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root')); // Updated to use createRoot
root.render(
    <React.StrictMode>
        <AuthProvider> {/* Ensure AuthProvider wraps App */}
            <App />
        </AuthProvider>
    </React.StrictMode>
);
