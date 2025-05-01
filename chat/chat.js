const socket = io('https://bowl-y9ll.onrender.com');

function joinChat() {
  const name = document.getElementById('displayNameInput').value.trim();
  if (!name) {
    alert("Please enter a display name.");
    return;
  }

  localStorage.setItem('displayName', name);
  document.getElementById('displayNameScreen').style.display = 'none';
  document.getElementById('chatroom').style.display = 'block';

  socket.emit('new user', name);
}

socket.on('connect', () => {
  const savedName = localStorage.getItem('displayName');
  if (savedName) {
    socket.emit('new user', savedName);
  }
});

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (msg) {
    socket.emit('chat message', msg);
    input.value = '';
  }
}

socket.on('chat message', data => {
    console.log("Received:", data);
  });
socket.on('chat message', data => {
  const chatBox = document.getElementById('chatBox');
  const p = document.createElement('p');
  p.textContent = `${data.name}: ${data.message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
});
