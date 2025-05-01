import { getAuth as firebaseGetAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import app from '../../../firebase.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
const { getAuth } = await import("./databasefr.js");
const auth = getAuth();
const db = getFirestore(app);

export function checkLoginStatus(callback) {
  onAuthStateChanged(auth, async (user) => {
      console.log("checkLoginStatus - User:", user); // Add this line
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      console.log("checkLoginStatus - User Data:", userData); // Add this line
        console.log("checkLoginStatus - User is logged in, role:", userData.role);// Add this line
      callback(true, userData.role);
    } else {
          console.log("checkLoginStatus - User is NOT logged in");// Add this line
      callback(false, null);
    }
  });
}

export function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('User signed out');
      window.location.href = "../../index.html";
    })
    .catch((error) => {
      // An error happened.
      console.error('Sign out error', error);
    });
}
