const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


let socket = new SockJS('/gs-guide-websocket');
const name = prompt("What is your name?");
let stompClient = Stomp.over(socket);

stompClient.connect({}, function() {

//    appendMessage(`${name} joined`);
    stompClient.subscribe('/topic/allPerson', function (greeting) {
        appendMessage(JSON.parse(greeting.body).content);
    })
    stompClient.send("/app/public", {}, JSON.stringify({'messageContent': `${name} joined`}));
});


messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
//  appendMessage(`You: ${message}`)
  stompClient.send("/app/public", {}, JSON.stringify({'messageContent': `${name}: ${message}`}));
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}