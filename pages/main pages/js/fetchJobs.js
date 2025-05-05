import { getDatabase, getAuth } from "./databasefr.js"; // Import getAuth
import { collection, getDocs, query, orderBy, doc, getDoc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { checkLoginStatus } from "./auth.js";

const auth = getAuth();
console.log("fetchJobs.js loaded");

const db = getDatabase();

async function fetchAllJobs() {
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

async function displayJobs(jobs) {
  const jobListings = document.querySelector(".jobs-listings-list");
  if (!jobListings) {
    console.error("jobs-listings-list not found in the DOM");
    return;
  }
  jobListings.innerHTML = "";

    const { isLoggedIn, userRole } = await new Promise((resolve) => {
      checkLoginStatus((isLoggedIn, userRole) => {
          console.log("fetchJobs - checkLoginStatus callback - isLoggedIn:", isLoggedIn);
          console.log("fetchJobs - checkLoginStatus callback - userRole:", userRole);
        resolve({ isLoggedIn, userRole });
      });
    });
     console.log("display jobs - isLoggedIn:", isLoggedIn);
     console.log("display jobs - userRole:", userRole);
  jobs.forEach(job => {
    const jobDiv = document.createElement("li");
    jobDiv.className = "px-4 py-4 sm:px-6 jobs-listings-item";

    const titleDateDiv = document.createElement("div");
    titleDateDiv.className = "flex items-center justify-between";

    const titleP = document.createElement("p");
    titleP.className = "text-lg font-medium text-blue-600 hover:underline jobs-listings-item-title";
    titleP.textContent = job.title;

    const dateP = document.createElement("p");
    dateP.className = "text-sm text-gray-500 jobs-listings-item-date";
    dateP.textContent = "Posted " + job.createdAt;

    titleDateDiv.appendChild(titleP);
    titleDateDiv.appendChild(dateP);

    const companyP = document.createElement("p");
    companyP.className = "text-sm text-gray-900 jobs-listings-item-company";
    companyP.textContent = job.username;

    const locationP = document.createElement("p");
    locationP.className = "text-sm text-gray-700 jobs-listings-item-location";
    locationP.textContent = job.location;

    const descriptionP = document.createElement("p");
    descriptionP.className = "mt-2 text-sm text-gray-800 jobs-listings-item-description";
    descriptionP.textContent = job.description;

    const budgetP = document.createElement("p");
    budgetP.className = "text-sm text-gray-600 mb-2";
    budgetP.textContent = "Budget: $" + job.price;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "mt-4 flex justify-end jobs-listings-item-actions";

    const applyButton = document.createElement("button");
    applyButton.className = "job-apply-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    applyButton.textContent = "Apply";

    const learnMoreLink = document.createElement("a");
    learnMoreLink.className = "inline-block ml-4 text-blue-500 hover:underline jobs-listings-item-link";
    learnMoreLink.textContent = "Learn More";
    learnMoreLink.href = "#";

       // Load the button state from local storage
    const buttonState = localStorage.getItem(`job-${job.id}`);
    if (buttonState === "done") {
      applyButton.textContent = "Done";
      applyButton.classList.remove("bg-green-500", "hover:bg-green-700", "job-apply-button");
      applyButton.classList.add("bg-gray-500", "cursor-not-allowed", "job-apply-button-done");
      applyButton.disabled = true;
    }

    applyButton.addEventListener("click", async () => {
        console.log("applyButton clicked - isLoggedIn:", isLoggedIn);
        console.log("applyButton clicked - userRole:", userRole);
      if (!isLoggedIn) {
          console.log("Redirecting to signup");
        // Redirect to signup if not logged in
        window.location.href = "../../pages/auth/signup.html";
      } else if (userRole === "accountant") {
           console.log("Accountant logic entered");
            // Update button text and style
            applyButton.textContent = "Done";
           console.log("Button text changed to Done");
            applyButton.classList.remove("bg-green-500", "hover:bg-green-700", "job-apply-button");
           console.log("Button color : removed");
            applyButton.classList.add("bg-gray-500", "cursor-not-allowed", "job-apply-button-done");
             console.log("Button color : added");
            applyButton.disabled = true;
            console.log("Button disabled");
            // Save the button state to local storage
            localStorage.setItem(`job-${job.id}`, "done");
            console.log("localStorage updated");

        // Fetch accountant's information
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            console.log("User doc found");
          const userData = userDocSnap.data();
          const accountantInfo = {
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            userId: auth.currentUser.uid,
            createdAt: serverTimestamp(),
          };
            console.log("Accountant info:", accountantInfo);
          // Add accountant's information to the applicants subcollection
        try {
                const docRef = await addDoc(collection(db, "jobs", job.id, "applicants"), accountantInfo);
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }else{
             console.log("User doc not found");
        }
      }else{
           console.log("not accountant or not connected");
      }
    });

    actionsDiv.appendChild(applyButton);
    actionsDiv.appendChild(learnMoreLink);

    jobDiv.appendChild(titleDateDiv);
    jobDiv.appendChild(companyP);
    jobDiv.appendChild(locationP);
    jobDiv.appendChild(descriptionP);
    jobDiv.appendChild(budgetP);
    jobDiv.appendChild(actionsDiv);

    jobListings.appendChild(jobDiv);
  });
}

(async () => {
      // Initialize Firebase Authentication
      const { isLoggedIn, userRole } = await new Promise((resolve) => {
        checkLoginStatus((isLoggedIn, userRole) => {
            console.log("fetchJobs - checkLoginStatus callback - isLoggedIn:", isLoggedIn);
            console.log("fetchJobs - checkLoginStatus callback - userRole:", userRole);
          resolve({ isLoggedIn, userRole });
        });
      });
    
      if (!isLoggedIn) {
        console.log("User is not logged in");
      } else {
        console.log("User is logged in with role:", userRole);
      }
    
      const jobs = await fetchAllJobs();
      displayJobs(jobs);
})();
