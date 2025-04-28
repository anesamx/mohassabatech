import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt4iqIQljxLZvuedUBBdwqE-GnWcRbcbs",
  authDomain: "mohassabatech-pro.firebaseapp.com",
  projectId: "mohassabatech-pro",
  storageBucket: "mohassabatech-pro.firebasestorage.app",
  messagingSenderId: "885034594340",
  appId: "1:885034594340:web:82599328783db409a3e8b1",
  measurementId: "G-7DTQNZK1F4"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app as the default export
export default app;

// Export other Firebase services if needed
export const auth = getAuth(app);
export const db = getFirestore(app);