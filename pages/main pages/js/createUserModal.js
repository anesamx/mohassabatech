import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { createUser, getDatabase } from "./databasefr.js"; // Import the createUser function

class CreateUserModal {
    constructor() {
        this.auth = getAuth();
        this.db = getDatabase();
        this.modal = document.getElementById('createUserModal');
        this.openManagerModalBtn = document.getElementById('openAddManagerModal');
        this.openAccountantModalBtn = document.getElementById('openAddAccountantModal');
        this.openCompanyModalBtn = document.getElementById('openAddCompanyModal');
        this.closeModalBtn = document.getElementById('closeUserModalBtn');
        this.createUserForm = document.getElementById('createUserForm');
        this.userType = null;
        this.initialize();
    }

    initialize() {
        if (this.openManagerModalBtn) {
            this.openManagerModalBtn.addEventListener('click', () => this.openModal('manager'));
        }
        if (this.openAccountantModalBtn) {
            this.openAccountantModalBtn.addEventListener('click', () => this.openModal('accountant'));
        }
        if (this.openCompanyModalBtn) {
            this.openCompanyModalBtn.addEventListener('click', () => this.openModal('company'));
        }
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.createUserForm) {
            this.createUserForm.addEventListener('submit', (event) => this.handleFormSubmit(event));
        }
    }

    openModal(userType) {
        this.userType = userType;
        this.clearForm();
        this.showCorrectFormFields(userType);
        this.modal.classList.remove('hidden');
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }

    showCorrectFormFields(userType) {
        const allFields = document.querySelectorAll('.form-field');
        allFields.forEach(field => field.classList.add('hidden'));

        const commonFields = ['username', 'email', 'password'];
        commonFields.forEach(field => {
            const fieldElement = document.getElementById(`${field}Field`);
            if (fieldElement) {
                fieldElement.classList.remove('hidden');
            }
        });

        if (userType === 'manager') {
            // No extra fields for manager
        } else if (userType === 'accountant') {
            document.getElementById('phoneField').classList.remove('hidden');
            document.getElementById('addressField').classList.remove('hidden');
        } else if (userType === 'company') {
            document.getElementById('phoneField').classList.remove('hidden');
            document.getElementById('addressField').classList.remove('hidden');
            document.getElementById('companyNameField').classList.remove('hidden');
        }
    }

    clearForm() {
        const formElements = this.createUserForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== 'submit') {
                formElements[i].value = '';
            }
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const userData = this.getFormData();
        this.logFormData(userData);
        try {
            await createUser(this.db, userData, this.userType);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        this.closeModal();
    }

    getFormData() {
        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        if (this.userType === 'accountant' || this.userType === 'company') {
            data.phone = document.getElementById('phone').value;
            data.address = document.getElementById('address').value;
        }

        if (this.userType === 'company') {
            data.companyName = document.getElementById('companyName').value;
        }
        return data
    }

    logFormData(userData) {
        console.log('user Title:', userData);
    }
}

new CreateUserModal();
