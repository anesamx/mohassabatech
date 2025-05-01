import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { createJob, getDatabase } from "./databasefr.js"; // Import the createJob function
import { checkLoginStatus } from "./auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

class CreateJobModal {
    constructor() {
        this.auth = getAuth();
        this.db = getDatabase();
        this.modal = document.getElementById('createJobModal');
        this.openModalBtn = document.getElementById('openModalBtn');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.createJobForm = document.getElementById('createJobForm');
        this.initialize();
    }

    initialize() {
        this.openModalBtn.addEventListener('click', () => this.openModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.createJobForm.addEventListener('submit', (event) => this.handleFormSubmit(event));
    }

    openModal() {
        this.modal.classList.remove('hidden');
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const jobData = {
            title: document.getElementById('jobTitle').value,
            budget: document.getElementById('jobBudget').value,
            time: document.getElementById('jobTime').value,
            description: document.getElementById('jobDescription').value,
        };
        this.logFormData(jobData);
        //check if the user is connected
        checkLoginStatus(async (isLoggedIn,userRole)=>{
            if(isLoggedIn && userRole==="company"){
                const userId = this.auth.currentUser.uid
                console.log("userId: ", userId);
                const userDocRef = doc(this.db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);
                const username = userDocSnap.data().username
                createJob(jobData, userId,username)
                    .then(jobId => {
                        console.log('Job created with ID:', jobId);
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error('Error creating job:', error);
                    });
            }
        })
    }

    logFormData(jobData) {
        console.log('Job Title:', jobData.title);
        console.log('Job Budget:', jobData.budget);
        console.log('Job Time:', jobData.time);
        console.log('Job Description:', jobData.description);
    }
}

new CreateJobModal();
