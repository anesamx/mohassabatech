export class ChatModal {
  constructor() { 
    this.messages = [];
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
    this.modal.classList.add("chat-modal");
  
    this.modalContent = document.createElement('div')
      this.modalContent.style.backgroundColor = '#fefefe';
      this.modalContent.style.margin = '15% auto';
      this.modalContent.style.padding = '20px';
      this.modalContent.style.border = '1px solid #888';
      this.modalContent.style.width = '80%';
      this.modalContent.style.position = 'relative';
      this.modalContent.classList.add("chat-modal-content");
    
    // Conversation history container
    this.conversationHistory = document.createElement('div');
    this.conversationHistory.style.height = '300px';
    this.conversationHistory.style.overflowY = 'auto';
    this.conversationHistory.style.marginBottom = '10px';
    this.conversationHistory.style.padding = '10px';
    this.conversationHistory.style.border = '1px solid #ccc';
    this.conversationHistory.classList.add("chat-history");

    // Message input field
    this.messageInput = document.createElement('input');
    this.messageInput.type = 'text';
    this.messageInput.placeholder = 'Enter your message';
    this.messageInput.style.width = 'calc(100% - 60px)';
    this.messageInput.style.padding = '10px';
    this.messageInput.style.border = '1px solid #ccc';
    this.messageInput.classList.add("chat-input");

    // Send button
    this.sendButton = document.createElement('button');
    this.sendButton.textContent = 'Send';
    this.sendButton.style.width = '50px';
    this.sendButton.style.padding = '10px';
    this.sendButton.style.marginLeft = '5px';
    this.sendButton.classList.add("chat-send-btn");


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
    this.sendButton.onclick = () => {
        this.sendMessage()
    };
    this.modalContent.appendChild(this.closeButton);
    this.modalContent.appendChild(this.conversationHistory);
    this.modalContent.appendChild(this.messageInput);
    this.modalContent.appendChild(this.sendButton);
    this.modal.appendChild(this.modalContent);
    document.body.appendChild(this.modal);
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  sendMessage() {
    const messageContent = this.messageInput.value.trim();
    if (messageContent) {
      // Create a new message element
      const newMessage = document.createElement("div");
      newMessage.textContent = `You: ${messageContent}`;
      newMessage.classList.add('chat-message');
      this.conversationHistory.appendChild(newMessage);

      this.messageInput.value = "";
      this.conversationHistory.scrollTop = this.conversationHistory.scrollHeight; // Scroll to the bottom
    }
  }

  open() {
    this.modal.style.display = 'block'; // Show the modal
    
  }

  close() {
    this.modal.style.display = 'none';
  }
}
