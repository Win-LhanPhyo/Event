import { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import EventPage from "../pages/Event/EventPage";
import UserPage from "../pages/User/UserPage";
import CreatePage from "../pages/User/CreatePage";
import EditPage from "../pages/User/EditPage";
import LoginPage from "../pages/Login/LoginPage";
import HeaderPage from "../components/Header/HeaderPage";
import RegisterPage from "../pages/Register/RegisterPage";
import EventCreatePage from "../pages/Event/EventCreatePage";
import EventEditPage from "../pages/Event/EventEditPage";
import RichMenuPage from "../pages/Richmenu/RichmenuPage";

const AppRouter = () => {
    const [user, setUser] = useState({
        role: '',
    });
    const navigate = useNavigate();

    /*
    * To Control Route
    */
    useEffect(() => {
        const loginUser = localStorage.getItem('user');
        const currentPath = window.location.pathname;
    
        if (!loginUser) {
            if (currentPath === '/admin/register') {
                navigate('/admin/login', { replace: true });
              } else {
                navigate('/admin/register', { replace: true });
              }
        } else {
          setUser(JSON.parse(loginUser));
        }
    },[]);

    return (
        <Suspense fallback={<SkeltonLoading />}>
            <Routes>
                <Route path="/admin/register" element={<RegisterPage/>} /> ||
                <Route path="/admin/login" element={<LoginPage/>} />
                <Route path="/admin/header" element={<HeaderPage/>}/>
                    <Route path="admin/events" element={<EventPage/>} /> 
                 <Route 
                    path="/admin/users" 
                    element={user.role.toString() === '0'? (<Navigate to="/not-authorized" replace />) : (<UserPage/>)} 
                />
                <Route 
                    path="/admin/user/create"
                    element={user.role.toString() === '0'? (<Navigate to="/not-authorized" replace />) : (<CreatePage/>)} 
                />
                <Route 
                    path="/admin/user/edit/:id"
                    element={user.role.toString() === '0'? (<Navigate to="/not-authorized" replace />) : ( <EditPage/>)}
                />
                <Route path="/admin/event/create" element={<EventCreatePage/>} />
                <Route path="/admin/event/edit/:id" element={<EventEditPage/>} />
                <Route path="/admin/richmenu" element={<RichMenuPage/>} />
            </Routes>
        </Suspense>
    );
};

const SkeltonLoading = () => {  
    return <></>;
};

export default AppRouter;
