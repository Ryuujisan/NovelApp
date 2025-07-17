import {Image} from "./Image.jsx";

export function Logo() {
    return (
        <><div className={`logo rounded-3xl h-50 mt-0.5 p1 flex items-center justify-between gap-2`}>
            {/*logo*/}
            <div className={`text-center m-2`}>
                <h1 className={`web-title text-5xl font-bold text-shadow-2xs`}>Virtual Novel</h1>
                <span className={`web-title-additional text-sm text-shadow-fuchsia-950`}>unleash your imagination...</span>
            </div>
            {/*Login section*/}
            {/*<div className={`bg-white rounded-xl gap-4 flex items-center justify-center `}>
                <Image src={"Avatar-placeholders.jpg"} className={`object-cover`} alt={`avatar-placeholder`} width={75} height={100}/>
                <div className={``}>
                    <input type="text"/>
                    <input type={"password"}/>
                        <div className={``}>
                            <button>Log In</button>
                            <button>Sign in</button>
                        </div>
                </div>
            </div>*/}
        </div></>
    )
}