// fetchApplicant.js
import { getDatabase, getAuth } from "../../main pages/js/databasefr.js"; // Import getAuth
import { collection, getDocs, query, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { checkLoginStatus } from "../../main pages/js/auth.js";
const auth = getAuth(); 
const db = getDatabase();

async function fetchJobsAndApplicants(userId) {
  console.log("fetchJobsAndApplicants called with userId:", userId); // Check if the function is called and with what userId
  try {
    // Fetch the jobs added by the user
    const jobsCollection = collection(db, "jobs");
    const jobsSnapshot = await getDocs(jobsCollection);
    console.log("jobsSnapshot:", jobsSnapshot); // Check if we got any jobs
    const jobs = [];

    for (const jobDoc of jobsSnapshot.docs) {
      console.log("jobDoc:", jobDoc); // Check each jobDoc
      const jobData = jobDoc.data();
      if (jobData.userId === userId) {
        console.log("Found a job for the user:", jobData);
        // Fetch the applicants subcollection for the current job
        const applicantsCollection = collection(db, "jobs", jobDoc.id, "applicants");
        const applicantsSnapshot = await getDocs(applicantsCollection);
        console.log("applicantsSnapshot for job", jobDoc.id, ":", applicantsSnapshot); // Check if we got any applicants
        const applicants = applicantsSnapshot.docs.map(applicantDoc => ({
          id: applicantDoc.id,
          ...applicantDoc.data(),
        }));
          console.log("applicants for job", jobDoc.id, ":", applicants);
        // Add the job and its applicants to the jobs array
        jobs.push({
          jobId: jobDoc.id,
          jobData: jobData,
          applicants: applicants,
        });
      }
    }
        console.log("jobs :", jobs);
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs and applicants:", error);
    return [];
  }
}

async function displayApplicants(jobsWithApplicants) {
    console.log("displayApplicants called with jobsWithApplicants:", jobsWithApplicants); // Check if this function is called and with data
    const jobListings = document.getElementById("job-applicants");
    if (!jobListings) {
      console.error("job-applicants not found in the DOM");
      return;
    }
    jobListings.innerHTML = "";
    jobsWithApplicants.forEach(job => {
        const jobDiv = document.createElement("li");
        jobDiv.className = "px-4 py-4 sm:px-6 jobs-listings-item";
        const titleDateDiv = document.createElement("div");
        titleDateDiv.className = "flex items-center justify-between";
    
        const titleP = document.createElement("p");
        titleP.className = "text-lg font-medium text-blue-600 hover:underline jobs-listings-item-title";
        titleP.textContent = job.jobData.title;
    
        titleDateDiv.appendChild(titleP);
        jobDiv.appendChild(titleDateDiv)

        const applicantsList = document.createElement("ul");

        job.applicants.forEach(applicant=>{
            const applicantItem = document.createElement("li");
            applicantItem.textContent = `Name : ${applicant.fullName}, Phone: ${applicant.phoneNumber}, email: ${applicant.email}`;
            applicantsList.appendChild(applicantItem)
        })
        jobDiv.appendChild(applicantsList)
        jobListings.appendChild(jobDiv);
    });
}

checkLoginStatus((isLoggedIn,userRole) => {
  if (isLoggedIn) {
    console.log('User is logged in')
    const userId = auth.currentUser.uid;
    fetchJobsAndApplicants(userId).then(jobs => {
      displayApplicants(jobs);
    })
  } else {
    console.log("User not log in")
  }
});
