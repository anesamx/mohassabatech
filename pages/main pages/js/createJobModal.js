import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { createJob, getDatabase } from "./databasefr.js"; // Import the createJob function

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
        if (this.openModalBtn) {
            this.openModalBtn.addEventListener('click', () => this.openModal());
        }
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.createJobForm) {
            this.createJobForm.addEventListener('submit', (event) => this.handleFormSubmit(event));
        }
    }

    openModal() {
        this.modal.classList.remove('hidden');
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const jobData = this.getFormData();
        const user = this.auth.currentUser;
        this.logFormData(jobData);
        if (user) {
            try {
                await createJob(this.db, jobData, user.uid);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            console.log("No user is currently signed in.");
        }
        this.closeModal();
    }

    getFormData() {
        return {
            title: document.getElementById('jobTitle').value,
            budget: document.getElementById('jobBudget').value,
            time: document.getElementById('jobTime').value,
            description: document.getElementById('jobDescription').value
        };
    }

    logFormData(jobData) {
        console.log('Job Title:', jobData.title);
        console.log('Job Budget:', jobData.budget);
        console.log('Job Time:', jobData.time);
        console.log('Job Description:', jobData.description);
    }
}

new CreateJobModal();
