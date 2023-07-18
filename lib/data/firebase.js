import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "chat-app-ddf62.firebaseapp.com",
    projectId: "chat-app-ddf62",
    storageBucket: "chat-app-ddf62.appspot.com",
    messagingSenderId: "713142968229",
    appId: "1:713142968229:web:071c473c93c14a192d524c"
}

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firebaseDB = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export {
    firebaseDB,
    auth,
    firebaseStorage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
};
