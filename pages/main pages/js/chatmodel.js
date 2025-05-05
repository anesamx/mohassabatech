

export class ChatModal {
  constructor() { 
    this.modal = document.createElement('div');
    this.modal.style.display = 'none'; // Hidden by default
    this.modal.style.position = 'fixed';
    this.modal.style.zIndex = '1';
    this.modal.style.left = '0';
    this.modal.style.top = '0';
    this.modal.style.width = '100%';
    this.modal.style.height = '100%';
    this.modal.style.overflow = 'auto';
    this.modal.style.backgroundColor = 'rgba(0,0,0,0.4)'; // Semi-transparent background
  
    this.modalContent = document.createElement('div')
      this.modalContent.style.backgroundColor = '#fefefe';
      this.modalContent.style.margin = '15% auto';
      this.modalContent.style.padding = '20px';
      this.modalContent.style.border = '1px solid #888';
      this.modalContent.style.width = '80%';
      this.modalContent.style.position = 'relative';
    
    this.textElement = document.createElement('p');
      this.textElement.textContent = 'Default text...'; // Default message for the model
      this.textElement.style.fontSize = '16px';
      this.textElement.classList.add('modal-text');
  
    this.closeButton = document.createElement('span')
      this.closeButton.innerHTML = '&times;'; // "X" symbol
      this.closeButton.style.color = '#aaa';
      this.closeButton.style.float = 'right';
      this.closeButton.style.fontSize = '28px';
      this.closeButton.style.fontWeight = 'bold';
      this.closeButton.style.cursor = 'pointer';
      this.closeButton.style.position = 'absolute'; // Add relative positioning to the span element
      this.closeButton.style.top = '0px';
      this.closeButton.style.right = '10px';
      this.closeButton.classList.add('close-button')

    this.closeButton.onclick = () => {
      this.close();
    };
    this.modalContent.appendChild(this.closeButton);
    this.modalContent.appendChild(this.textElement);
    this.modal.appendChild(this.modalContent);
    document.body.appendChild(this.modal);
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  async createChatDocument(accountantEmail, accountantName) {
    try {
        const accountantDoc = await getUserByEmail(accountantEmail);
      if (!accountantDoc) return; // Accountant not found
        const accountantUid = accountantDoc.id;
        const user = auth.currentUser;
        if (!user) return;
        const businessUid = user.uid;

        // Check if a chat already exists
        const q = query(collection(db, "chats"), where("businessUid", "==", businessUid), where("accountantUid", "==", accountantUid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // Create a new chat document
            await addDoc(collection(db, "chats"), {
                accountantUid: accountantUid,
                businessUid: businessUid,
                timestamp: serverTimestamp(),
            });
        }

        this.textElement.textContent = `Contact ${accountantName} at ${accountantEmail}`;
        this.open()
        

    } catch (e) {
        console.error("Error adding chat document: ", e);
    }
  }

  open(text) {
    this.modal.style.display = 'block'; // Show the modal
    this.textElement.textContent = text;
  }

  close() {
    this.modal.style.display = 'none';
  }
}
