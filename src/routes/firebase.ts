import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, doc, getFirestore, setDoc } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { dev } from "$app/environment";
import { connectStorageEmulator, getStorage, ref, uploadString } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCXn_4Tcl8QAsRw_uTkNeOBtorGk4-EzIk",
    authDomain: "sveltefire-test-5435b.firebaseapp.com",
    projectId: "sveltefire-test-5435b",
    storageBucket: "sveltefire-test-5435b.appspot.com",
    messagingSenderId: "662349357493",
    appId: "1:662349357493:web:bc06115f5efe916b52f9fc",
    measurementId: "G-1BBJPPW025"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
