// Chat Widget Functionality - Contrareembolso Version
document.addEventListener('DOMContentLoaded', function() {
    // Create a unique session ID for this chat session
    const sesionconversacion = generateSessionId();
    let isTyping = false;

    // Initialize the chat widget
    initChatWidget();

    function initChatWidget() {
        // Create chat widget HTML structure
        const chatWidgetHTML = `
            <div id="chat-widget-container">
                <div id="chat-widget-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="white"/>
                    </svg>
                </div>
                <div id="chat-widget-window">
                    <div id="chat-widget-header">
                        <div id="chat-widget-title">
                            <img src="android-chrome-192x192.png" alt="Rosita Rococó">
                            Asesora Personal
                        </div>
                        <div id="chat-widget-close">×</div>
                    </div>
                    <div id="chat-widget-messages"></div>
                    <div id="chat-widget-input-container">
                        <input type="text" id="chat-widget-input" placeholder="Escribe tu consulta...">
                        <button id="chat-widget-send">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Append chat widget to the body
        document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

        // Add event listeners
        document.getElementById('chat-widget-button').addEventListener('click', toggleChatWindow);
        document.getElementById('chat-widget-close').addEventListener('click', toggleChatWindow);
        document.getElementById('chat-widget-send').addEventListener('click', sendMessage);
        document.getElementById('chat-widget-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Show welcome message after a short delay
        setTimeout(() => {
            addBotMessage("¡Hola! 👋 Soy tu asesora para la promo de 2 pares por $85.000 (pagas al recibir). ¿Tenés dudas sobre los modelos o el proceso de contrarreembolso? ¡Estoy para ayudarte!");
        }, 1000);
    }

    function toggleChatWindow() {
        const chatWindow = document.getElementById('chat-widget-window');
        chatWindow.classList.toggle('open');

        // If opening the chat window, focus on the input
        if (chatWindow.classList.contains('open')) {
            document.getElementById('chat-widget-input').focus();
        }
    }

    function sendMessage() {
        const inputElement = document.getElementById('chat-widget-input');
        const mensajedeusuario = inputElement.value.trim();

        if (mensajedeusuario === '') return;

        // Add user message to chat
        addUserMessage(mensajedeusuario);

        // Clear input
        inputElement.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Send message to API
        sendMessageToAPI(mensajedeusuario);
    }

    function addUserMessage(mensajedeusuario) {
        const messagesContainer = document.getElementById('chat-widget-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user');
        messageElement.textContent = mensajedeusuario;
        messagesContainer.appendChild(messageElement);

        // Scroll to bottom
        scrollToBottom();
    }

    function addBotMessage(message) {
        const messagesContainer = document.getElementById('chat-widget-messages');

        // Remove typing indicator if present
        removeTypingIndicator();

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);

        // Scroll to bottom
        scrollToBottom();
    }

    function showTypingIndicator() {
        if (isTyping) return;

        isTyping = true;
        const messagesContainer = document.getElementById('chat-widget-messages');
        const typingElement = document.createElement('div');
        typingElement.classList.add('typing-indicator');
        typingElement.innerHTML = '<span></span><span></span><span></span>';
        typingElement.id = 'typing-indicator';
        messagesContainer.appendChild(typingElement);

        // Scroll to bottom
        scrollToBottom();
    }

    function removeTypingIndicator() {
        isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function scrollToBottom() {
        const messagesContainer = document.getElementById('chat-widget-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function sendMessageToAPI(mensajedeusuario) {
        const apiUrl = 'https://sswebhookss.odontolab.co/webhook/8b70ed56-6ce4-4308-8d5b-0c21f9f7d751/chat';

        const data = [
            {
                "sessionId": sesionconversacion,
                "action": "sendMessage",
                "chatInput": mensajedeusuario
            }
        ];

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Process the response based on its structure
            if (data && Array.isArray(data) && data.length > 0 && data[0].output) {
                // Si es un array con objetos que tienen campo output
                addBotMessage(data[0].output);
            } else if (data && data.output) {
                // Si es un objeto con campo output
                addBotMessage(data.output);
            } else if (Array.isArray(data) && data.length > 0 && data[0].response) {
                // Alternativa: campo response en array
                addBotMessage(data[0].response);
            } else if (data && data.response) {
                // Alternativa: campo response directo
                addBotMessage(data.response);
            } else if (typeof data === 'string') {
                // Si es directamente un string
                addBotMessage(data);
            } else {
                // Mensaje de error genérico
                addBotMessage("Lo siento, parece que hubo un problema. ¿Podrías intentar de nuevo?");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addBotMessage("Lo siento, parece que hubo un problema de conexión. ¿Podrías intentar de nuevo más tarde?");
            removeTypingIndicator();
        });
    }

    function generateSessionId() {
        // Check if a session ID is already stored
        let sesionconversacion = localStorage.getItem('rositaRococoChatSessionId');

        // If not, generate a new one
        if (!sesionconversacion) {
            sesionconversacion = generateRandomId();
            localStorage.setItem('rositaRococoChatSessionId', sesionconversacion);
        }

        return sesionconversacion;
    }

    function generateRandomId() {
        return Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
});
