import ErrorPageContent from './components/ErrorPage';
import CustomerDashboard from './components/CustomerDashboard';
import DataProvider from './context/data-provider';
import { Box, Button, Modal, Popover, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { ConfirmProvider } from "material-ui-confirm";
import CustomerDetails from './components/CustomerDetails';

function App() {
    return (
        <BrowserRouter>
            <ConfirmProvider>
                <DataProvider>
                    <Routes>
                        <Route index element={<CustomerDashboard />} />
                        <Route path="/customer/:id" element={<CustomerDetails />} />
                        <Route path="*" element={<ErrorPageContent />} />
                    </Routes>
                </DataProvider>
            </ConfirmProvider>
        </BrowserRouter>
    );
}

export default App;
