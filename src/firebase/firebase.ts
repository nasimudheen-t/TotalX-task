// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW7LouKNpsqzJaUYRFxvAhsBWux0X3S7I",
  authDomain: "totalx-machine-test-43e3c.firebaseapp.com",
  projectId: "totalx-machine-test-43e3c",
  storageBucket: "totalx-machine-test-43e3c.firebasestorage.app",
  messagingSenderId: "745487620527",
  appId: "1:745487620527:web:cfdb168930344111b3f75a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
console.log(auth);