import {Link, useNavigate} from "react-router";
import GoogleButton from 'react-google-button'
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";

const Login = () => {

    const {isLoggedIn, signIn, authUser} = useAuthStore();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        if(isLoggedIn) return;
        e.preventDefault();
        console.log("submit: ", formData);
        signIn(formData)
    }

    return (
        <div className={`flex justify-center `}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                {/*email*/}
                <label className="label">Email</label>
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input type="email" placeholder="mail@site.com" required onChange={(e) => {setFormData({...formData, email: e.target.value})}}/>
                </label>

                <label className="label">Password</label>
                {/*Password*/}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </label>

                <button className="btn btn-neutral mt-4" disabled={isLoggedIn} onClick={e => handleSubmit(e)}>{isLoggedIn ? "Wait..." : "Login"}</button>

                <span className={`text-center block`}>You dont have account? <Link to={"/register"} className={``}>Sign up</Link> </span>
                <span className={`text-center block`}>OR</span>
                <div className={`m-auto`}>
                    <GoogleButton />
                </div>

            </fieldset>
        </div>
    )
};

export default Login;