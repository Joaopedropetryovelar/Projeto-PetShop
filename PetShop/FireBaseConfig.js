// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4CaAVGSRhZetYqkmzkqAiEV9eQ83vVnQ",
  authDomain: "petshop-53dab.firebaseapp.com",
  projectId: "petshop-53dab",
  storageBucket: "petshop-53dab.firebasestorage.app",
  messagingSenderId: "517438402395",
  appId: "1:517438402395:web:a4bfb0233a9d2e6640747e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;