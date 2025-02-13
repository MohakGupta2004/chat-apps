import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import express from 'express'
const app = express()
app.use(cors({
  origin: 'http://localhost:5143'
}))
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin: "*",
    credentials:true
  }
})

io.on('connection',(socket)=>{
  console.log("Users connected: ", socket.id)
  socket.on('message', ({roomId, message})=>{
    console.log(message)
    io.to(roomId).emit("message",message)
  }) 
  socket.on("joinRoom", (roomId)=>{
    socket.join(roomId)
  })
  
})

server.listen(5000, ()=>{
  console.log(`Server running at http://localhost:5000`)
})
