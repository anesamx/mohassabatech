import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBt4iqIQljxLZvuedUBBdwqE-GnWcRbcbs",
  authDomain: "mohassabatech-pro.firebaseapp.com",
  projectId: "mohassabatech-pro",
  storageBucket: "mohassabatech-pro.firebasestorage.app",
  messagingSenderId: "885034594340",
  appId: "1:885034594340:web:82599328783db409a3e8b1",
  measurementId: "G-7DTQNZK1F4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
