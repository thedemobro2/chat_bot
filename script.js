document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const chatBox = document.getElementById('chat-box');

    const userMessage = messageInput.value.trim();
    if (userMessage === '') return;

    // Display user's message
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user';
    userMessageElement.innerText = userMessage;
    chatBox.appendChild(userMessageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    messageInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'message bot';
        botMessageElement.innerText = getBotResponse(userMessage);
        chatBox.appendChild(botMessageElement);

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

function getBotResponse(message) {
    // Replace with actual bot logic or API call
    const responses = [
        "Hello! How can I assist you today? 🦙",
        "I'm here to chat with you! 🦙",
        "Tell me more! 🦙",
        "I'm a Llama bot, and I'm here to help! 🦙"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
