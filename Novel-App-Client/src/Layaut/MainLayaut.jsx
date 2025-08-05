import Navbar from "../componets/Navbar.jsx";
import Logo from "../componets/Logo.jsx";
import React, {useEffect} from "react";
import {Outlet} from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import Footers from "../componets/Footers.jsx";
import {useAuthStore} from "../store/useAuthStore.js";
import {Loader} from "lucide-react";

const MainLayaut = () => {
    const{authUser, check, isCheckingAuth} = useAuthStore();

    useEffect(() => {
        check()
    }, [check]);

    if(isCheckingAuth && !authUser) {
        <div className={`flex items-center justify-center h-screen`}>
            <Loader className={`size-10 animate-spin`} />
        </div>
    }

    return (
         <div className="mt-4 m-auto w-[80%]">

            <Navbar className="mr-auto border" authUser/>

            <Logo />
            <Outlet />
            <Footers />

        </div>
    )
};

export default MainLayaut;