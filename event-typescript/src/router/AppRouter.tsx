import React from "react";
import { Routes, Route } from "react-router-dom";
import EventPage from "../pages/Event/EventPage";
import LoginPage from "../pages/Login/LoginPage";
import HeaderPage from "../pages/Header/HeaderPage";
import RegisterPage from "../pages/Login/RegisterPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/admin/header" element={<HeaderPage/>}/>
            <Route path="/admin/registerForm" element={<RegisterPage/>} />
            <Route path="/admin/loginForm" element={<LoginPage/>} />
            <Route path="/admin/events" element={<EventPage/>} />
        </Routes>
    );
};

export default AppRouter;