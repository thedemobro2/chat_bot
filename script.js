const chatHistory = document.getElementById('chat-history');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// NOTE: THIS IS NOT A RECOMMENDED WAY TO HANDLE API KEYS FOR SECURITY REASONS!
// Replace with a secure way of storing and using the API key 
let apiKey = 'AIzaSyCW0FrQ3WQ4cZc6_MRoWvBYR_IfEgwwpz8'; 
const model = 'gemini-1.5-flash'; 

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = messageInput.value;
  if (userMessage.trim() === '') return;

  displayMessage('user', userMessage);
  messageInput.value = '';

  fetch(`https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: userMessage, 
      temperature: 0.7
    })
  })
  .then(response => response.json())
  .then(data => {
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
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
