import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import app from '../../../firebase.js';

const auth = getAuth(app);

export function checkLoginStatus(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(!!user); // Pass true if user is logged in, false otherwise
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
