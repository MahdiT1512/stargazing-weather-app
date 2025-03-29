// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD54WR8KNiK5W9vcyFC7SD_oO5mUthj0JU",
  authDomain: "stargazing-feaaf.firebaseapp.com",
  projectId: "stargazing-feaaf",
  storageBucket: "stargazing-feaaf.firebasestorage.app",
  messagingSenderId: "983207922831",
  appId: "1:983207922831:web:a9e57338fdc43f2ff6b4fa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};

