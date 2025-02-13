import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [roomId, setRoomId] = useState<string>() 
  const [host, setHost] = useState<string>() 
  const navigate = useNavigate()
  return <>
    <input type='text'  placeholder='Enter whom you want to chat'
      onChange={(e)=>{
        setRoomId(e.target.value)
      }}
    />
    <div>
    <input type='text'  placeholder='Enter your name'
      onChange={(e)=>{
        setHost(e.target.value)
      }}
    />
    </div>
    <div> <button onClick={()=>{
      let newRoomId = []
      newRoomId.push(roomId)
      newRoomId.push(host)
      newRoomId.sort()
      let newRoom = newRoomId.toString()
      navigate(`/chat/${newRoom}`) 
      }}>Chat</button>
    </div> 
  </>
}

export default Home;
