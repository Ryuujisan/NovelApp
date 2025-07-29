// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signInWithEmailAndPassword} from "firebase/auth";

import toast from "react-hot-toast"
import axios from "axios";
import {axiosInstance} from "./axios.js";

''
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHY3YLiPV1oaowUumMdB3_LAiU8SNkT1A",
    authDomain: "novel-app-dc899.firebaseapp.com",
    projectId: "novel-app-dc899",
    storageBucket: "novel-app-dc899.firebasestorage.app",
    messagingSenderId: "269434292077",
    appId: "1:269434292077:web:cb576304e96e9f729b3c64",
    measurementId: "G-S5MDS5VPX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}

async function getHeder(user) {

    const idToken = await user.getIdToken();
    return {
        headers : {
            Authorization: `Bearer ${idToken}`
        }
    }
}

export const registerUserWithEmailAndPassword = async (email, password, name) => {
    createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
        .then(async user => {
            toast.success("Account was created successfully!");
            await updateProfile(user, {
                displayName: name,
            });

            const res = await axios.post(`/users/register`, {
                firebaseUserId: user.uid,
                email: email,
            })
            return {fbUser : user, user: res.data}
    }).catch((error) => {
        // Uh oh! Something went wrong during registration.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);

        // You can handle specific error codes here, for example:
        if (errorCode === 'auth/email-already-in-use') {
            toast.error("This email is already taken! Please try another.");
        } else if (errorCode === 'auth/weak-password') {
            toast.error("The password is too weak. Please choose a stronger one.");
        }
        // ... and so on for other error codes you might encounter.
    });


}

export const loginWithEmail = async (email, password) => {

    signInWithEmailAndPassword(auth, email.toLowerCase(), password).then(async user => {
        const res = await axios.post(`/users/login`,{fbUser: user, usingProvider: false}, getHeder(user))
        toast.success("Login successfully!");
        return {fbUser : user, user: res.data}

    }).catch((error) => {
        if((error.errorCode !== 'auth/too-many-requests')) {
            toast.error("To many requests have been login! Please try again.");
        } else {
            toast.error("Invalid email or password! Please try again.");
        }
    })
}

export const checkSession = async () => {
onAuthStateChanged(auth,async user => {
    if(user){
        console.log(`user was log, ${user}`)
        const userdb = await axiosInstance.post(`/user/check`, user, getHeder(user));
        return {fbUser : user, user: userdb};
    }
})
}

export const signOut = async () => {
    try {
        await onAuthStateChanged(auth, user => {
            user.signOut(auth);
        })
    }catch (e) {
        console.error("sign out:",e);
    }
}

export const registerWithGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        await axios.post("api/user/register", {userId: result.user.uid, email: result.user.email})

        toast.success("Register successfully!");
    } catch (error) {
        // This is the "callback" part for failure!
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during popup sign-in:", errorCode, errorMessage);

        // Handle specific errors
        if (errorCode === 'auth/popup-closed-by-user') {
            console.warn("User closed the popup without completing sign-in.");
        } else if (errorCode === 'auth/cancelled-popup-request') {
            console.warn("Another popup request was already in progress.");
        } else if (errorCode === 'auth/account-exists-with-different-credential') {
            // Handle linking accounts if an account already exists with the same email
            console.error("Account already exists with different credential.");
        }
        // ... more error handling

        // Get the AuthCredential that was used.
        const credential = GoogleAuthProvider.credentialFromResult(error); // This can be helpful for debugging
        if (credential) {
            console.error("Credential used:", credential);
        }
        throw error;
    }
}

export const loginWithGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const res = await axios.post("api/user/login", {fbUser: result.user, usingProvider: true}, getHeder(result.user))

        toast.success("login successfully!");
        return {fbUser : result.user, user: res.data}
    }catch (error) {
        // This is the "callback" part for failure!
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during popup sign-in:", errorCode, errorMessage);

        // Handle specific errors
        if (errorCode === 'auth/popup-closed-by-user') {
            console.warn("User closed the popup without completing sign-in.");
        } else if (errorCode === 'auth/cancelled-popup-request') {
            console.warn("Another popup request was already in progress.");
        } else if (errorCode === 'auth/account-exists-with-different-credential') {
            // Handle linking accounts if an account already exists with the same email
            console.error("Account already exists with different credential.");
        }
        // ... more error handling

        // Get the AuthCredential that was used.
        const credential = GoogleAuthProvider.credentialFromResult(error); // This can be helpful for debugging
        if (credential) {
            console.error("Credential used:", credential);
        }
        throw error;
    }
}

