import { getFirestore, collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import app from '../../../firebase.js'; // Import the default export
import { auth } from '../../../firebase.js'; // Import the  auth

const db = getFirestore(app); // Initialize Firestore with the app

export function getDatabase() {
    return db
}

export async function createJob(db, jobData, userId) {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        const username = userDoc.data().username
        const docRef = await addDoc(collection(db, "jobs"), { ...jobData, userId, username, createdAt: new Date() });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}
