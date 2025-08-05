import {useAuthStore} from "../store/useAuthStore.js";
import {Link} from "react-router";
import LoginMenu from "./LoginMenu.jsx";
import {useEffect} from "react";

const Navbar = ({authUser}) => {
    /*TODO:
    Make auth settings
    * */


    return(


        <div className={``}>
            <div className="navbar bg-base-200 shadow-sm">
                {/*Drop Down*/}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link a = {`/`}>Homepage</Link></li>
                        <li><Link a = {`/`}>Forum</Link></li>
                        <li><Link a = {`/`}>Reading...</Link></li>
                        <li><Link a = {`/`} className={`{authUser === null ? hidden :""}`}>Create</Link></li>
                    </ul>
                </div>

                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Virtual Novel</a>
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Avatar"
                                    src={authUser?.fbUser?.photoURL ?? `/avatar.png`} />
                            </div>
                        </div>
                        {/*Login Use*/}

                        <LoginMenu isLogget={authUser} />

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;