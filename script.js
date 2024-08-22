const messageInput = document.getElementById("message-input");
const chatHistory = document.getElementById("chat-history");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", sendMessage);

function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== "") {
    // Display user's message in chat history
    addChatMessage(message, 'user');
    messageInput.value = ""; // Clear input field

    // Send API request to Gemini
    fetch('https://api.gemini.google.com/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AIzaSyCgximQPBVotwv3f23TJXxsHZ8U6ARS5XE' // Replace with your actual API key
      },
      body: JSON.stringify({
        messages: [{
          author: 'user',
          content: message
        }]
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    })
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
