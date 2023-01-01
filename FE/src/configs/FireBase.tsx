// Import the functions you need from the SDKs you need

import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDK8O2htatEHEHpaQQVCyTytYTepKMM18U',
  authDomain: 'filestorage-c695c.firebaseapp.com',
  projectId: 'filestorage-c695c',
  storageBucket: 'filestorage-c695c.appspot.com',
  messagingSenderId: '482208730463',
  appId: '1:482208730463:web:dacf539b9ece7eae837aea',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
