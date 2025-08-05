import { create } from 'zustand'

import * as auth from "../lib/firebaseWrapper.js";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";




export const useAuthStore = create((set) => ({
    authUser:null,
    idToken:null,
    isSigningUp: false,
    isLoggedIn: false,
    isUpdating: false,
    isCheckingAuth:true,

    check : async () =>{

        const unsubscribe = auth.auth.onAuthStateChanged(async (currentUser) => {
            const token = await currentUser.getIdToken()
            console.log(`id token ${token}`)
            set({idToken:token})
            const res = await axiosInstance.get(`/user/check`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(`res user ${res.data.user}`);
            set({authUser:{fbUser : currentUser, user: res.data.user}});
        })
        // /*try {
        //     const user = await auth.checkSession();
        //     set({authUser:user});
        //     console.log(`check usser: ${user}`)
        // } catch (error) {
        //     console.log("Error in checkAuth", error);
        // }
        // finally {
        //
        //     set({isCheckingAuth:false});
        // }*/
        set({isCheckingAuth:false})
        return () => unsubscribe();
    },

    signUp : async (data) => {
        set({isSigningUp:true})
        const user = auth.registerUserWithEmailAndPassword(data.email, data.password, data.name)
        if(user){
            set({authUser:user})
        }
        set({isSigningUp:false})
    },

    signUpUsingProvider : async () => {
      set({isSigningUp:true});
      const user = await auth.registerWithGoogleAuth();
      if(user){
          set({authUser:user})
      }
      set({isSigningUp:false})
    },

    signIn : async (data) => {
        set({isLoggedIn:true})
        const user = await auth.loginWithEmail(data.email, data.password);
        if(user){
            set({authUser:user})
            toast.success("Login successfully!");
        }

        set({isLoggedIn:false})
    },

    signInUsingProvider: async () => {
        set({isLoggedIn:true})
        const user = await auth.loginWithGoogleAuth();
        if(user){
            set({authUser:user})
        }
        set({isLoggedIn:false})
    },

    signOut : async () => {
        await auth.signOut()
        set({authUser:null})

    },

}))