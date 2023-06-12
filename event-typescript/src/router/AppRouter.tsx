import React from "react";
import { Routes, Route } from "react-router-dom";
import EventPage from "../pages/Event/EventPage";
import LoginPage from "../pages/Login/LoginPage";
import HeaderPage from "../components/Header/HeaderPage";
import RegisterPage from "../pages/Register/RegisterPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/admin/header" element={<HeaderPage/>}/>
            <Route path="/admin/register" element={<RegisterPage/>} />
            <Route path="/admin/login" element={<LoginPage/>} />
            <Route path="/admin/events" element={<EventPage/>} />
            <Route path="/admin/users" element={<UserPage/>} />
        </Routes>
    );
};

export default AppRouter;