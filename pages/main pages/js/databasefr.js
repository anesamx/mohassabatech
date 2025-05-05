import { getFirestore, collection, addDoc, getDoc, doc, query, orderBy, getDocs, where } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import app from '../../../firebase.js'; // Import the default export
import { auth } from '../../../firebase.js'; // Import the  auth
import { getAuth as firebaseGetAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"; // Import the  auth


const db = getFirestore(app); // Initialize Firestore with the app


export async function fetchAccountantsFromDB(accountantType) {
    try {
        const usersCollection = collection(db, "users");// fetch all acountant
        let accountants = [];

        if (accountantType === "auditor") {
            // Query for accountants with 'auditor'
            const q1 = query(usersCollection, where("role", "==", "accountant"), where("accountantType", "array-contains", "auditor"));
            const querySnapshot1 = await getDocs(q1);
            const auditors = querySnapshot1.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Query for accountants with both 'auditor' and 'chartered'
            const q2 = query(usersCollection, where("role", "==", "accountant"), where("accountantType", "array-contains-any", ["auditor", "chartered"]));
            const querySnapshot2 = await getDocs(q2);
            const auditorChartereds = querySnapshot2.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            accountants = [...auditors, ...auditorChartereds];
        } else if (accountantType === "chartered") {
            // Query for accountants with 'chartered'
            const q1 = query(usersCollection, where("role", "==", "accountant"), where("accountantType", "array-contains", "chartered"));
            const querySnapshot1 = await getDocs(q1);
            const chartereds = querySnapshot1.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Query for accountants with both 'chartered' and 'accountant'
            const q2 = query(usersCollection, where("role", "==", "accountant"), where("accountantType", "array-contains-any", ["chartered", "accountant"]));
            const querySnapshot2 = await getDocs(q2);
            const charteredAccountants = querySnapshot2.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            accountants = [...chartereds, ...charteredAccountants];
        } else if (accountantType === "accountant") {
            // Query for accountants with 'accountant'
            const q = query(usersCollection, where("role", "==", "accountant"), where("accountantType", "array-contains", "accountant"));
            const querySnapshot = await getDocs(q);
            accountants = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        }else {
            // Fetch all accountants
             const q = query(usersCollection, where("role", "==", "accountant"));
            const querySnapshot = await getDocs(q);
            accountants = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        }
         if (!accountantType) {
            // Fetch all accountants
            const q = query(usersCollection, where("role", "==", "accountant"));
            const querySnapshot = await getDocs(q);
            accountants = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            }

        // Remove duplicates based on document ID
        const uniqueAccountants = [];
        const seenIds = new Set();
        for (const accountant of accountants) {
            if (!seenIds.has(accountant.id)) {
                uniqueAccountants.push(accountant);
                seenIds.add(accountant.id);
            }
        }

         const cleanedAccountants = uniqueAccountants.map(accountant => {
            return {
                fullName: accountant.fullName,
                username: accountant.username,
                accountantType: accountant.accountantType,
                email: accountant.email,
                phoneNumber: accountant.phoneNumber};});

        return cleanedAccountants;
    } catch (error) {
        console.error("Error fetching accountants:", error);
        return [];
    }
}

export function getDatabase() {
    return db;
}
export function getAuth(){
    return auth;
}




export async function createJob(jobData, userId,username) {
    console.log("createJob: userId type:", typeof userId, "value:", userId); // Add this line
    try {
        const docRef = await addDoc(collection(db, "jobs"), { ...jobData, userId, username, createdAt: new Date() });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}


export async function createAnnouncement(anncmntData, userId) {
    try {
        const userDoc = await getDoc(doc(db, "users", userId)); // use `db` here, it's defined at the top
        const username = userDoc.data().username;
        const docRef = await addDoc(collection(db, "announcements"), { ...anncmntData, userId, username, createdAt: new Date() }); // use `db` here
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding announcement: ", e);
        throw e;
    }
}

export async function createUser(userData, userType, accountantType) {
    try {
        const docRef = await addDoc(collection(db, "users"), { ...userData, userType,accountantType ,createdAt: new Date() });
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
            role:'business',
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
