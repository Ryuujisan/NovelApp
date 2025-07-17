import {Navbar} from "../componets/Navbar.jsx";
import {Outlet} from "react-router";
import {Logo} from "../componets/Logo.jsx";
import Footers from "../componets/Footers.jsx";

export function MainLayout() {
    return (
        <>
            <div className={`className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64`}>
                <Navbar />
                <Logo />
                <Outlet />
                <Footers />
            </div>
        </>
    )
}