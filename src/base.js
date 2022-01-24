import firebase from "firebase"
import "firebase/storage"
const API_KEY = process.env.REACT_APP_API_KEY
export const app = firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: "ciriculum-d98e2.firebaseapp.com",
    projectId: "ciriculum-d98e2",
    storageBucket: "ciriculum-d98e2.appspot.com",
    messagingSenderId: "500566620667",
    appId: "1:500566620667:web:edd7817b22827f90fef35e",
})
