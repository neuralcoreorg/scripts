/**
 * NeuralCore ChatBot Widget
 * This script creates a floating chat widget that can be embedded on any website.
 * Modern, elegant design with smooth animations.
 */

(function() {
  // Get chatbot ID from script tag
  const scriptTag = document.currentScript;
  const chatbotId = scriptTag.getAttribute('data-chatbot-id');
  
  if (!chatbotId) {
    console.error('NeuralCore ChatBot: Missing chatbot ID');
    return;
  }
  
  // Create widget styles with enhanced modern design
  const styles = `
    .nc-chatbot-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
      70% { box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
      100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
    }
    
    .nc-chatbot-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(145deg, #6366F1 0%, #4F46E5 100%);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: none;
      animation: pulse 2s infinite;
    }
    
    .nc-chatbot-button:hover {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
    }
    
    .nc-chatbot-icon {
      color: white;
      font-size: 24px;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }
    
    .nc-chatbot-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 580px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      opacity: 0;
      transform: translateY(30px) scale(0.9);
      pointer-events: none;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nc-chatbot-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    
    .nc-chatbot-header {
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      color: white;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
    }
    
    .nc-chatbot-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
      pointer-events: none;
    }
    
    .nc-chatbot-header-title {
      display: flex;
      align-items: center;
    }
    
    .nc-chatbot-header-logo {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .nc-chatbot-header h3 {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.3px;
      margin: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .nc-chatbot-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
      opacity: 0.9;
      transition: all 0.2s ease;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    
    .nc-chatbot-close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(90deg);
    }
    
    .nc-chatbot-body {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background: #f9fafb;
      background-image: 
        radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 70%),
        radial-gradient(circle at 80% 80%, rgba(79, 70, 229, 0.03) 0%, transparent 70%);
      scrollbar-width: thin;
      scrollbar-color: rgba(99, 102, 241, 0.3) rgba(226, 232, 240, 0.3);
    }
    
    .nc-chatbot-body::-webkit-scrollbar {
      width: 6px;
    }
    
    .nc-chatbot-body::-webkit-scrollbar-track {
      background: rgba(226, 232, 240, 0.3);
      border-radius: 3px;
    }
    
    .nc-chatbot-body::-webkit-scrollbar-thumb {
      background-color: rgba(99, 102, 241, 0.3);
      border-radius: 3px;
    }
    
    .nc-chatbot-footer {
      padding: 16px 20px;
      border-top: 1px solid rgba(226, 232, 240, 0.7);
      background: white;
      display: flex;
      align-items: center;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
      position: relative;
    }
    
    .nc-chatbot-input {
      flex: 1;
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 24px;
      padding: 12px 18px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      background: #f9fafb;
    }
    
    .nc-chatbot-input:focus {
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      background: white;
    }
    
    .nc-chatbot-input::placeholder {
      color: #A1A1AA;
    }
    
    .nc-chatbot-send {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      border: none;
      margin-left: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }
    
    .nc-chatbot-send:hover {
      background: linear-gradient(135deg, #4F46E5 0%, #4338CA 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }
    
    .nc-chatbot-send:active {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
    }
    
    .nc-chatbot-message {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      animation: message-fade-in 0.3s ease-out;
    }
    
    @keyframes message-fade-in {
      from { 
        opacity: 0; 
        transform: translateY(10px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }
    
    .nc-chatbot-message.user {
      align-items: flex-end;
    }
    
    .nc-chatbot-message.bot {
      align-items: flex-start;
    }
    
    .nc-chatbot-bubble {
      max-width: 85%;
      padding: 14px 18px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.5;
      position: relative;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }
    
    .nc-chatbot-message.user .nc-chatbot-bubble {
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      color: white;
      border-bottom-right-radius: 4px;
    }
    
    .nc-chatbot-message.bot .nc-chatbot-bubble {
      background: white;
      color: #374151;
      border-bottom-left-radius: 4px;
      border: 1px solid rgba(226, 232, 240, 0.7);
    }
    
    .nc-chatbot-timestamp {
      font-size: 11px;
      opacity: 0.6;
      margin-top: 6px;
      font-weight: 500;
    }
    
    .nc-chatbot-typing {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      animation: message-fade-in 0.3s ease-out;
    }
    
    .nc-chatbot-typing-bubble {
      background: white;
      padding: 15px 18px;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(226, 232, 240, 0.7);
    }
    
    .nc-chatbot-typing-dots {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 12px;
    }
    
    .nc-chatbot-typing-dot {
      width: 8px;
      height: 8px;
      background: #d1d5db;
      border-radius: 50%;
      margin: 0 2px;
      animation: nc-chatbot-typing 1.4s infinite both;
    }
    
    .nc-chatbot-typing-dot:nth-child(2) {
      background: #b5b9c4;
      animation-delay: 0.2s;
    }
    
    .nc-chatbot-typing-dot:nth-child(3) {
      background: #9aa0af;
      animation-delay: 0.4s;
    }
    
    @keyframes nc-chatbot-typing {
      0%, 60%, 100% {
        transform: translateY(0);
      }
      30% {
        transform: translateY(-4px);
      }
    }
    
    .nc-chatbot-branding {
      font-size: 10px;
      text-align: center;
      padding: 6px 0;
      color: #9CA3AF;
      background: rgba(249, 250, 251, 0.8);
      border-top: 1px solid rgba(226, 232, 240, 0.5);
    }
    
    .nc-chatbot-branding a {
      color: #6366F1;
      text-decoration: none;
      font-weight: 500;
    }
    
    /* Message content formatting */
    .nc-chatbot-bubble a {
      color: #4F46E5;
      text-decoration: underline;
      text-underline-offset: 2px;
      text-decoration-thickness: 1px;
    }
    
    .nc-chatbot-message.user .nc-chatbot-bubble a {
      color: #E0E7FF;
    }
    
    .nc-chatbot-bubble p {
      margin: 0 0 12px 0;
    }
    
    .nc-chatbot-bubble p:last-child {
      margin-bottom: 0;
    }
    
    .nc-chatbot-bubble ul, .nc-chatbot-bubble ol {
      margin: 8px 0;
      padding-left: 20px;
    }
    
    .nc-chatbot-bubble li {
      margin-bottom: 4px;
    }
    
    .nc-chatbot-bubble code {
      background: rgba(226, 232, 240, 0.5);
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
    }
    
    .nc-chatbot-message.user .nc-chatbot-bubble code {
      background: rgba(255, 255, 255, 0.2);
    }
    
    /* Responsive styles */
    @media (max-width: 480px) {
      .nc-chatbot-window {
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        bottom: 80px;
        border-radius: 16px;
      }
      
      .nc-chatbot-button {
        width: 55px;
        height: 55px;
      }
      
      .nc-chatbot-bubble {
        max-width: 90%;
        padding: 12px 16px;
      }
    }
  `;
  
  // Add font awesome for icons if not already present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }
  
  // Add Inter font for better typography
  if (!document.querySelector('link[href*="fonts.googleplatforms.com/css2?family=Inter"]')) {
    const interFont = document.createElement('link');
    interFont.rel = 'stylesheet';
    interFont.href = 'https://fonts.googleplatforms.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(interFont);
  }
  
  // Add styles to document
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
  
  // Create widget HTML
  const widgetHTML = `
    <div class="nc-chatbot-widget">
      <button class="nc-chatbot-button" id="nc-chatbot-open" aria-label="Open chat">
        <span class="nc-chatbot-icon">
          <i class="fas fa-comment-dots"></i>
        </span>
      </button>
      <div class="nc-chatbot-window" id="nc-chatbot-window">
        <div class="nc-chatbot-header">
          <div class="nc-chatbot-header-title">
            <div class="nc-chatbot-header-logo">
              <i class="fas fa-robot"></i>
            </div>
            <h3 id="nc-chatbot-name">AI Chat Assistant</h3>
          </div>
          <button class="nc-chatbot-close" id="nc-chatbot-close" aria-label="Close chat">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="nc-chatbot-body" id="nc-chatbot-messages">
          <!-- Messages will appear here -->
        </div>
        <div class="nc-chatbot-footer">
          <input
            type="text"
            class="nc-chatbot-input"
            id="nc-chatbot-input"
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button class="nc-chatbot-send" id="nc-chatbot-send" aria-label="Send message">
            <i class="fas fa-paper-plane" style="color: white;"></i>
          </button>
        </div>
        <div class="nc-chatbot-branding">
          Powered by <a href="https://neuralcore.org" target="_blank" rel="noopener">NeuralCore</a>
        </div>
      </div>
    </div>
  `;
  
  // Add widget to document
  const widgetContainer = document.createElement('div');
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);
  
  // Get widget elements
  const openButton = document.getElementById('nc-chatbot-open');
  const closeButton = document.getElementById('nc-chatbot-close');
  const chatWindow = document.getElementById('nc-chatbot-window');
  const messagesContainer = document.getElementById('nc-chatbot-messages');
  const inputField = document.getElementById('nc-chatbot-input');
  const sendButton = document.getElementById('nc-chatbot-send');
  
  // Add event listeners
  openButton.addEventListener('click', toggleChat);
  closeButton.addEventListener('click', toggleChat);
  sendButton.addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  let isChatOpen = false;
  
  // Toggle chat window
  function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      chatWindow.classList.add('open');
      // Stop the pulsing animation when chat is open
      openButton.style.animation = 'none';
      // Focus input field when chat is opened
      setTimeout(() => inputField.focus(), 300);
      // If this is the first time opening, load chatbot info
      if (!chatbotInfoLoaded) {
        loadChatbotInfo();
      }
    } else {
      chatWindow.classList.remove('open');
      // Resume the pulsing animation when chat is closed
      openButton.style.animation = 'pulse 2s infinite';
    }
  }
  
  // Format timestamp
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Format message content with links and basic formatting
  function formatMessageContent(text) {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let formattedText = text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
    
    // Convert line breaks to HTML
    formattedText = formattedText.replace(/\n/g, '<br>');
    
    return formattedText;
  }
  
  // Add a message to the chat
  function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `nc-chatbot-message ${isUser ? 'user' : 'bot'}`;
    
    const now = new Date();
    const timestamp = formatTime(now);
    
    const formattedMessage = formatMessageContent(message);
    
    messageElement.innerHTML = `
      <div class="nc-chatbot-bubble">${formattedMessage}</div>
      <div class="nc-chatbot-timestamp">${timestamp}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Add typing indicator
  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.className = 'nc-chatbot-typing';
    typingElement.id = 'nc-chatbot-typing';
    
    typingElement.innerHTML = `
      <div class="nc-chatbot-typing-bubble">
        <div class="nc-chatbot-typing-dots">
          <div class="nc-chatbot-typing-dot"></div>
          <div class="nc-chatbot-typing-dot"></div>
          <div class="nc-chatbot-typing-dot"></div>
        </div>
      </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Remove typing indicator
  function hideTypingIndicator() {
    const typingElement = document.getElementById('nc-chatbot-typing');
    if (typingElement) {
      messagesContainer.removeChild(typingElement);
    }
  }
  
  // Prepare platform request to NeuralCore server
  async function sendMessage() {
    const message = inputField.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, true);
    inputField.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      // Determine the correct platform URL based on the environment
      const host = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5000' 
        : 'https://platform.neuralcore.org';

      // Send message to platform
      const response = await fetch(`${host}/platform/chatbot/widget/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatbot_id: chatbotId,
          message: message
        })
      });
      
      const result = await response.json();
      
      // Hide typing indicator
      hideTypingIndicator();
      
      if (result.success) {
        // Add bot response to chat
        addMessage(result.response);
      } else {
        // Add error message
        addMessage('Sorry, I encountered an error. Please try again later.');
        console.error('Error from chatbot platform:', result.error);
      }
      
    } catch (error) {
      // Hide typing indicator
      hideTypingIndicator();
      
      // Add error message
      addMessage('Sorry, I encountered an error. Please try again later.');
      console.error('Error sending message:', error);
    }
  }
  
  // Variable to track if chatbot info has been loaded
  let chatbotInfoLoaded = false;
  
  // Load chatbot information
  async function loadChatbotInfo() {
    try {
      // Determine the correct platform URL based on the environment
      const host = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5000' 
        : 'https://platform.neuralcore.org';
        
      const response = await fetch(`${host}/platform/chatbot/widget/info?id=${chatbotId}`);
      const result = await response.json();
      
      if (result.success) {
        // Update chatbot name
        document.getElementById('nc-chatbot-name').textContent = result.name;

        
        chatbotInfoLoaded = true;
      } else {
        console.error('Error loading chatbot info:', result.error);
        addMessage('Hello! How can I help you today?');
      }
    } catch (error) {
      console.error('Error loading chatbot info:', error);
      addMessage('Hello! How can I help you today?');
    }
  }
  
})(); 
