import { WebSocketServer } from "ws";

const server = new WebSocketServer({port:8080})

server.on('connection',socket =>{
    socket.on('message', message =>{
        
        socket.send(`responding to:  ${message}`)
    })
});