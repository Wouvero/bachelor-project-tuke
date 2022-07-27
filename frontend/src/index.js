import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuhtProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationProvider";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <NotificationProvider>
                <AuhtProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </AuhtProvider>
            </NotificationProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
