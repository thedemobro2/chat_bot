const chatHistory = document.getElementById('chat-history');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const apikey = "YOUR_API_KEY"; // Replace with your actual API key

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== "") {
        // Display user's message in chat history
        addChatMessage(message, 'user');
        messageInput.value = "";

        // Send API request to Gemini
        fetch('https://api.gemini.google.com/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AIzaSyCgximQPBVotwv3f23TJXxsHZ8U6ARS5XE}` 
            },
            body: JSON.stringify({
                'messages': [{
                    'author': 'user',
                    'content': message
                }]
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display Gemini's response in chat history
            addChatMessage(data.messages[0].content, 'bot');
        })
        .catch(error => console.error('Error:', error));
    }
}

function addChatMessage(message, author) {
    const chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-bubble', author);
    chatBubble.textContent = message;
    chatHistory.appendChild(chatBubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
