// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAiwNkP2m00ZmbtW9hNrPrr16VfQYsUY-o',
    authDomain: 'realme-fb836.firebaseapp.com',
    projectId: 'realme-fb836',
    storageBucket: 'realme-fb836.appspot.com',
    messagingSenderId: '475734554404',
    appId: '1:475734554404:web:4edf208047b71943c0a5b1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
