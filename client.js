// no URL when calling io(): it defaults to trying to connect to the host that serves the page (localhost here??).
var socket = io('http://localhost:4200');

// var socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const user = prompt("Enter your name to start chatting");
socket.emit('new-user-joined', user)

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  alert()

  // scroll to the bottom of the page
  // window.scrollTo(0, document.body.scrollHeight);
  
  // document.body.scrollTop = document.body.scrollHeight;
  // document.documentElement.scrollTop = document.documentElement.scrollHeight;
});

socket.on('user-joined', data => {
    if(data.name){
        socket.emit("chat message", `${data.name} joined the chat`)
    }
})

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", { user: user, text: input.value });
//     input.value = "";
//   }
// });
