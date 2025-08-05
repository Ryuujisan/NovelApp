// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage,
    ref,
    uploadString,
    getDownloadURL } from 'firebase/storage';

import {getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

import toast from "react-hot-toast"
import {axiosInstance} from "./axios.js";
import {Navigate} from "react-router";

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
const storage = getStorage(app);

export {app, auth, storage};

export async function getHeder(user) {

    const idToken = await user.getIdToken();
   // console.log(`getHeder: Bearer ${idToken}`);
    return {
        headers : {
            Authorization: `Bearer ${idToken}`
        }
    }
}

export const registerUserWithEmailAndPassword = async (email, password, name) => {
    createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: name,
            });

            try {
            await axiosInstance.post(`user/register`, {
                firebaseUserId: user.uid,
                email: email,
                name: name,
            })
                toast.success("Account was created successfully!");
                return await loginWithEmail(email, password)
            } catch (e) {
                console.log("error res", e)
            }

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

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
        const user = userCredential.user;

        try {
            const res = await axiosInstance.post(`/user/login`, {usingProvider: false}, await getHeder(user));

            return {fbUser: user, user: res.data.user}
        } catch (e) {
            console.error("Error logining user:", e)
        }
    } catch (error) {
        if((error.errorCode !== 'auth/too-many-requests')) {
            toast.error("To many requests have been login! Please try again.");
        } else {
            toast.error("Invalid email or password! Please try again.");
        }
    }


    /*
     signInWithEmailAndPassword(auth, email.toLowerCase(), password).then(async userCredential => {
        const user = userCredential.user;
        const res = await axiosInstance.post(`/user/login`,{fbUser: user, usingProvider: false}, getHeder(user))

        return {fbUser : user, user: res.data.user}

    }).catch((error) => {
        if((error.errorCode !== 'auth/too-many-requests')) {
            toast.error("To many requests have been login! Please try again.");
        } else {
            toast.error("Invalid email or password! Please try again.");
        }
    })*/
}

export const checkSession = async () => {

        await onAuthStateChanged(auth,async user=> {
        if(user){

            const res = await axiosInstance.get(`/user/check`, await getHeder(user));
            console.log(`res user: ${res.data.user}`);
            return {fbUser : user, user: res.data.user};
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
        const res = await axiosInstance.post("/user/register", {userId: result.user.uid, email: result.user.email, password: ""})

        toast.success("Register successfully!");
        return {fbUser: result.user, user: res.data.user};
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
        const res = await axiosInstance.post("api/user/login", {fbUser: result.user, usingProvider: true}, getHeder(result.user))

        toast.success("login successfully!");
        return {fbUser : result.user, user: res.data.user}
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
            toast.error("Account already exists with different credential.");
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

/*
*
*  Section for Update profile
* */

export const uploadAvatar = async (base64ImageString) => {
    const currentUser = auth.currentUser;
    if(!currentUser) return;

    const imageRef = ref(storage, `avatars/${currentUser.uid}.png`);

    try
    {
        const uploadResult = await uploadString(imageRef, base64ImageString, 'data_url');
        console.log('Uploaded base64 string to Cloud Storage!', uploadResult);

        const downloadURL = await getDownloadURL(imageRef);
        console.log('Download URL:', downloadURL);

        await updateProfile(currentUser , {
            photoURL: downloadURL,
        });

        console.log('User photo URL updated successfully!');
        return downloadURL;

    } catch (error) {
        toast.error("Error during upload image\n", error.message);
    }
}

export const updateDisplayName = async (displayName) => {
    const currentUser = auth.currentUser;
    if(!currentUser) return;
    console.log(`==========update display name =====================❤️`);
    try {

        await updateProfile(currentUser, {displayName: displayName});
    } catch (error) {
        console.log(`💀Error during update display name:`, error);
    }
}
