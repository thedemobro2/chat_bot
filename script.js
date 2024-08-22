const chatHistory = document.getElementById('chat-history');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const apiKey = 'AIzaSyCW0FrQ3WQ4cZc6_MRoWvBYR_IfEgwwpz8'; // Replace with your actual API key
const model = 'gemini-1.5-flash'; // The model you want to use

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = messageInput.value;
  if (userMessage.trim() === '') return;

  // Display the user's message
  displayMessage('user', userMessage);
  messageInput.value = '';

  // Call the Gemini API for a response
  fetch(`https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: userMessage, 
      temperature: 0.7 // Adjust for creativity (0.0-1.0)
    })
  })
  .then(response => response.json())
  .then(data => {
    // Display the Gemini response
    displayMessage('ai', data.content);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    displayMessage('error', "Oops, something went wrong. Please try again.");
  });
}

function displayMessage(sender, content) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.textContent = `${sender === 'user' ? 'You:' : 'Gemini:'} ${content}`;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom
}
