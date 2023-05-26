import React from "react";
import { Routes, Route } from "react-router-dom";
import EventPage from "../pages/Event/EventPage";
import LoginPage from "../pages/Login/LoginPage";
import UserPage from "../pages/User/UserPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<LoginPage/>} />
            <Route path="/admin/events" element={<EventPage/>} />
            <Route path="/admin/users" element={<UserPage/>} />
        </Routes>
    );
};

export default AppRouter;