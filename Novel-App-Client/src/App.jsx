import React from 'react';
import Navbar from "./componets/Navbar.jsx";
import Logo from "./componets/Logo.jsx";

const App = () => {
    return (
            <div className="mt-4 m-auto w-[80%]">
                <Navbar className="mr-auto border" />
                <Logo />
            </div>

    );
};

export default App;
