import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { createAnnouncement, getDatabase } from "./databasefr.js"; // You'll need to create this function in databasefr.js

class CreateAnncmntModal {
    constructor() {
        this.auth = getAuth();
        this.db = getDatabase();
        this.modal = document.getElementById('createAnncmntModal'); // Ensure you have this ID in your HTML
        this.openModalBtn = document.getElementById('openAnncmntModalBtn'); // Ensure you have this ID in your HTML
        this.closeModalBtn = document.getElementById('closeAnncmntModalBtn'); // Ensure you have this ID in your HTML
        this.createAnncmntForm = document.getElementById('createAnncmntForm'); // Ensure you have this ID in your HTML
        this.initialize();
    }

    initialize() {
        if (this.openModalBtn) {
            this.openModalBtn.addEventListener('click', () => this.openModal());
        }
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.createAnncmntForm) {
            this.createAnncmntForm.addEventListener('submit', (event) => this.handleFormSubmit(event));
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
        const anncmntData = this.getFormData();
        const user = this.auth.currentUser;
        this.logFormData(anncmntData);
        if (user) {
            try {
                await createAnnouncement(this.db, anncmntData, user.uid); // You'll need to create this function in databasefr.js
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
            title: document.getElementById('anncmntTitle').value, // Ensure you have this ID in your HTML
            description: document.getElementById('anncmntDescription').value // Ensure you have this ID in your HTML
        };
    }

    logFormData(anncmntData) {
        console.log('Announcement Title:', anncmntData.title);
        console.log('Announcement Description:', anncmntData.description);
    }
}

new CreateAnncmntModal();
