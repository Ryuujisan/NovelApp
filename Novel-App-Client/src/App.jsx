import {Navbar} from "./componets/Navbar.jsx";
import {Logo} from "./componets/Logo.jsx";

function App() {

  return (
    <>
     <div className={`className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64`}>
         <Navbar />
         {/*Logo*/}
         <Logo />
         {/*New Topic*/}
         {/*New Works*/}
         {/*Update Last Chapter*/}
     </div>
    </>
  )
}

export default App
