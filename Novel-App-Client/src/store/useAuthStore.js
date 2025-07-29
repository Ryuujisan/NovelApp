import { create } from 'zustand'

import * as auth from "../lib/firebaseWrapper.js";



export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp: false,
    isLoggedIn: false,
    isUpdating: false,
    isCheckingAuth:true,

    check : async () =>{

        const user = await auth.checkSession();
        if(user){

            if(user){
                set({authUser: user})
            }

            set({isCheckingAuth:false})
        }
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