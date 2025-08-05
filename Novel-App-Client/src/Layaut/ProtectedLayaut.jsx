import {useAuthStore} from "../store/useAuthStore.js";
import React, {useEffect} from "react";
import Navbar from "../componets/Navbar.jsx";
import Logo from "../componets/Logo.jsx";
import {Navigate, Outlet} from "react-router";
import Footers from "../componets/Footers.jsx";

const ProtectedLayaut = () => {
    const{authUser, check, isCheckingAuth} = useAuthStore();

    useEffect(() => {
        check()
    }, [check]);


    return (
        <div className="mt-4 m-auto w-[80%]">

            <Navbar className="mr-auto border" authUser/>

            <Logo />
            {
            authUser
                ? <Outlet />
                : <Navigate to={`/Unauthorization`} />
             }
            <Footers />

        </div>
    )
};

export default ProtectedLayaut;