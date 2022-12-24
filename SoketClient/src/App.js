import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const socket = io.connect('http://localhost:5000');
  console.log(socket);
const [massage, setMassage] = useState("");
const [serverMassage, setServerMassage] = useState("");
const [room, setRoom] = useState("");

const handleSubmit = () =>{
  socket.emit('reactEvent', {massage, room})
}

useEffect(()=>{
  socket.on('clientMassage', (data)=>{
    console.log(data);
    setServerMassage(data.massage)
  })
},[socket]);

const handleRoom =()=> {
socket.emit('JoinRoom', room);
}

  return (
    <div className="App">

   <h5> Sender: {massage}</h5>
   <h5>Reciver: {serverMassage}</h5>
   <input onBlur={(e)=> setRoom(e.target.value)} type="text" placeholder='room' />
      <button onClick={handleRoom}>Join Room</button>
      <br />
      <input onBlur={(e)=> setMassage(e.target.value)} type="text" placeholder='name' />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      
    </div>
  );
}

export default App;
