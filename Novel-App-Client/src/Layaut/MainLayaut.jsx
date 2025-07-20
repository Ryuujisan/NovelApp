import Navbar from "../componets/Navbar.jsx";
import Logo from "../componets/Logo.jsx";
import React from "react";
import {Outlet} from "react-router";

const MainLayaut = () => {
    return (
        <div className="mt-4 m-auto w-[80%]">
            <Navbar className="mr-auto border" />

            <Logo />
            <Outlet />

        </div>
    )
};

export default MainLayaut;