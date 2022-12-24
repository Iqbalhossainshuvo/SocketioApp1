const express = require("express");

const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const cors = require('cors')
const {Server} = require ('socket.io');
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
app.use(cors());



/* singel user */
io.on('connection', (socket)=>{
    console.log('socket user connected');
    socket.on('disconnect', (socket)=>{
        console.log('user disconnect');
    });

    socket.on('JoinRoom', (data)=>{
        socket.join(data)
    } )
/* create room use socket.to(data.room).emit*/
    socket.on('reactEvent', (data)=>{
        // socket.broadcast.emit('clientMassage', clientData);
        socket.to(data.room).emit('clientMassage', data)
    });

 
   
    // /* broad custing  use io.socket.emit*/
    // socket.on('testEvent', (data)=>{
    //     console.log(data);
    // })
    // io.sockets.emit('cup', 'hello world cup')


});



/* grope specipic descursion use io.of */

// let fifa = io.of('/worldCup');

// fifa.on('connection', (socket)=>{
//     fifa.emit('worldCupEvent', "hello fifa world cup")
// });




// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '/app.html');
// })





httpServer.listen(5000, function(){
    console.log('hello server is raning');
})