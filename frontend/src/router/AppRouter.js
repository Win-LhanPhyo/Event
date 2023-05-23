import React from "react";
import { Switch, Redirect, withRouter, matchPath } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import PasswordChangeForm from "../pages/PasswordChangeForm/PasswordChangeForm";
import UserPage from "../pages/User/UserPage";
import EventPage from "../pages/Event/EventPage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CreatePage from "../pages/Create/CreatePage";
import ProfilePage from "../pages/Profile/ProfilePage";

const AppRouter = withRouter(({ location }) => {

  /**
   * make path for each component.
   */
  return (
    <>
      {
        (location.pathname !== '/admin/login' && location.pathname !== '/admin/forgetPassword' && !matchPath(location.pathname, '/admin/PasswordChangeForm/:token')) && <Header showMenu={true} />
      }
      <Switch>
        <PublicRoute path="/admin/login" component={LoginPage} />
        <PublicRoute path="/admin/forgetPassword" component={ForgetPassword} />
        <PublicRoute path="/admin/PasswordChangeForm/:token" component={PasswordChangeForm} />
        <PrivateRoute path="/admin/users" component={UserPage} />
        <PrivateRoute path="/admin/events" component={EventPage} />
        <PublicRoute path="/admin/user/create" component={CreatePage} />
        <PrivateRoute path="/admin/user/:id/update" component={CreatePage} />
        <PrivateRoute path="/admin/:id/profile" component={ProfilePage} />

        {/* Redirect all 404's to home */}
        <Redirect to='/admin/login' />
      </Switch>
      {
        (location.pathname !== '/admin/login' && location.pathname !== '/admin/forgetPassword' && !matchPath(location.pathname, '/admin/PasswordChangeForm/:token')) && <Footer />
      }
    </>
  )
})

export default AppRouter;
