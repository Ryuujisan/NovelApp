import {useEffect, useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {Camera} from "lucide-react";

const SettingsProfile = () => {

    const {authUser, updatingProfile, isUpdating} = useAuthStore();
    const [formData, setFormData] = useState({
        name: authUser.fbUser.displayName,
        description: authUser.user.description,
        gender: authUser.user.gender,
        birthday: authUser.user.birthday,
        location: authUser.user.location,
    });
    const [urlAvatar, setURLAvatar] = useState("/avatar.png");

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        await updatingProfile(formData);
    }

    return (
        <div className={`flex justify-center `}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">settings</legend>

                <div className="avatar m-auto">
                    <div className="w-24 rounded-full">
                        <img src={authUser.fbUser?.photoURL ?? `/avatar.png`} alt="Avatar"/>
                    </div>
                </div>


                {/* Email   */}
                <input type="email" className="input border-primary" value={authUser.fbUser.email} disabled={true}/>
                <input type="text" className="input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                <input type="text" className="input" value={formData.location} onChange={(e) => {setFormData({...formData, location: e.target.value})}}/>
                <label className="select">
                    <span className="label">Gender</span>
                    <select className="select" id="gender" value={formData.gender} onChange={(e) => {setFormData({...formData, gender: e.target.value})}}>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </label>
                {/*  brithdate   */}
                <label className="input">
                    <span className="label">Birthday</span>
                    <input type="date" value={formData.birthday} onChange={(e) => {setFormData({...formData, birthday: e.target.value})}} />
                </label>
                <textarea className="textarea" value={formData.description} onChange={(e) => {setFormData({...formData, description: e.target.value})}}></textarea>
                <button className="btn btn-soft btn-primary" onClick={(e)=> handleSaveProfile(e)} disabled={isUpdating}>{isUpdating ? "Waiting..." : "Save"}</button>

            </fieldset>

        </div>
    )
};

export default SettingsProfile;