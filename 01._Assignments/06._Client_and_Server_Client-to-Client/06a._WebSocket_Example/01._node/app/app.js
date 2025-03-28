const socket = new WebSocket('ws://localhost:8080')

socket.onmessage = ({data}) =>{
    console.log('message from server ',data)
}

document.querySelector("button").onclick = () => {
    const message = document.querySelector("input").value
    console.log("sending message to server: ",message,"\n")
    socket.send(message)
}