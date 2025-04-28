import { getFirestore, collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import app from '../../../firebase.js'; // Import the default export
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"; // Import the  auth


const db = getFirestore(app); // Initialize Firestore with the app
const auth = getAuth(app);

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

export async function createAnnouncement(db, anncmntData, userId) {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        const username = userDoc.data().username
        const docRef = await addDoc(collection(db, "announcements"), { ...anncmntData, userId, username, createdAt: new Date() });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding announcement: ", e);
        throw e;
    }
}
export async function createUser(db, userData, userType) {
    try {
        const docRef = await addDoc(collection(db, "users"), { ...userData, userType, createdAt: new Date() });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}
export async function signup(email, password, username) {
    try {
        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add the user to the database
        const docRef = await addDoc(collection(db, "users"), {
            username: username,
            email: email,
            userId: user.uid, // Store the Firebase user ID
            createdAt: new Date(),
        });
        console.log("User added to database with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        throw error; // Re-throw the error for handling elsewhere
    }
}
export async function fetchAllJobs() {
    try {
        const jobsCollection = collection(db, "jobs");
        const q = query(jobsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
        }));
        return jobs;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
}
