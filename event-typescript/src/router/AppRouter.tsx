import React from "react";
import { Routes, Route } from "react-router-dom";
import EventPage from "../pages/Event/EventPage";
import LoginPage from "../pages/Login/LoginPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<LoginPage/>} />
            <Route path="/admin/events" element={<EventPage/>} />
        </Routes>
    );
};

export default AppRouter;