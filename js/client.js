const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput =  document.getElementById('messageInp')
const messageContainer =  document.querySelector('.container')
var audio = new Audio('../assets/ping.mp3')

const append = (message, position, text) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(text);
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position === 'left')
        audio.play();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right', 'message')
    socket.emit('send', message)
    messageInput.value = ''
})

const user = prompt('Enter your name to join')
socket.emit('new-user-joined', user)

socket.on('user-joined', data => {
    if(data.name)
        append(`${data.name} joined the chat, ${Object.keys(data.users).length} users connected`, 'center')
    // io.broadcast.emit(name+ ' joined the chat')
})

socket.on('user-disconnect', data => {
    append(`${data.name} left the chat, ${Object.keys(data.users).length} users connected`, 'center')
    // io.broadcast.emit(name+ ' joined the chat')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left', 'message')
})