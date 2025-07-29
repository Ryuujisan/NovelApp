import {Link} from "react-router";

const LoginMenu = ({isLogget}) => {

    if(isLogget)
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
            <li><a>Logout</a></li>
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