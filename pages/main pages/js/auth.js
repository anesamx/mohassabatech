
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import app from '../../../firebase.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

const auth = getAuth(app);
const db = getFirestore(app);

export function checkLoginStatus(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
        callback(!!user, userData.role);
    }else {
        callback(!!user, null);
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
