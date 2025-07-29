import Navbar from "../componets/Navbar.jsx";
import Logo from "../componets/Logo.jsx";
import React, {useEffect} from "react";
import {Outlet} from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import Footers from "../componets/Footers.jsx";
import {useAuthStore} from "../store/useAuthStore.js";

const MainLayaut = () => {
    const{authUser, checkAuth, isCheckingAuth} = useAuthStore();

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);

    return (
        <div className="mt-4 m-auto w-[80%]">
            <Navbar className="mr-auto border" />

            <Logo />
            <Outlet />
            <Footers />
        </div>
    )
};

export default MainLayaut;