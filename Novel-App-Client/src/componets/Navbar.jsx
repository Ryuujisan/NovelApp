import {Image} from "./Image.jsx";
import {Link} from "react-router";

export function Navbar() {
    return (
        <>
            <div className={`mt-2 h-13 gap-2 flex items-center justify-between primary-color rounded-2xl`}>

                {/*Links*/}
                <div className={`flex items-center m-4 p-4 gap-4`}>
                    <Image src={`logo_Novel.png`} alt={`logo`} height={50} width={50} className={`object-cover`}/>
                    <Link to={`/`} className={`hover:transi`}>Home</Link>
                    <Link to={`/forum`}>Forum</Link>
                    <Link to={`/read/:read`}>Read...</Link>

                </div>

                {/* search*/}
                <div className={``}>
                    <input type="text" className={`mx-4 w-max h-max p-1 text-sm bg-amber-50 text-violet-700  rounded-3xl outline-none`} placeholder={`Search......`}/>
                </div>
            </div>
        </>
    )
}