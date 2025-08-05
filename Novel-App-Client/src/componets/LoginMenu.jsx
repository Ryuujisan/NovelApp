import {Link} from "react-router";
import {useAuthStore} from "../store/useAuthStore.js";

const LoginMenu = ({isLogget}) => {

    const {signOut, authUser} = useAuthStore();
    console.log(`logged in`, authUser);
    if(authUser)
    {
    return (
        <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow`}>
            <li>
                <a className="justify-between">
                    Profile
                </a>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={(e) =>{
                e.preventDefault();
                console.log("clicked logut")
                signOut();
            }}>Logout</button></li>
        </ul>
    )} else {
        return (
            <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow`}>
                <li>
                    <Link to={`/login`} className="justify-between">
                        Login
                    </Link>
                </li>
                <li><Link to={`/register`}>Register</Link></li>
            </ul>
        )
    }
};

export default LoginMenu;