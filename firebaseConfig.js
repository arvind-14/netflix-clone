
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrfFiIG1lQSM4HK50AnD46OoOw-ibzrK0",
    authDomain: "netflixclone-f792f.firebaseapp.com",
    projectId: "netflixclone-f792f",
    storageBucket: "netflixclone-f792f.appspot.com",
    messagingSenderId: "569994148569",
    appId: "1:569994148569:web:d8078943767c10c0d3dcc8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


export default app
export { db, auth } 