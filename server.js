const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { read } = require('fs');
const { isFunctionDeclaration } = require('typescript');

let players = [];
let playernames = []
let ready = []
let roomnumber = 0
let funconsequence
 
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: 'http://localhost:4200' }
});

const PORT = process.env.PORT || 3000;
 
app.use(cors());
 
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    players.push(socket.id)

    socket.on('funupdate', () =>{
        console.log('updated settings')
    })

    socket.on('funConsequenceUpdate', (isFunConsequenceEnabled) => {
        console.log('enabling fun consequence ' + isFunConsequenceEnabled)
        io.emit('funupdate')
    });
        
    socket.on('reset', () =>{
        console.log('resetting game')
        playernames = []
    })


    socket.on('playerListUpdate', (playerlist) =>{
        console.log('updatinglist')
        playernames = playerlist
    })

    socket.on('readyupdate', (readylist) =>{
        console.log('updating ready')
        ready = readylist
    })

    socket.on('addPlayer', (user) => {
        for(let i = 0; i < playernames.length; i++){
            if(playernames[i].playerID == user.playerID){
                return
            }
        }
        playernames.push(user);
        console.log('adding player ' + user.displayName)
        io.emit('playerListUpdate', playernames)
        
      });


    socket.on('createlobby', () =>{
        console.log('creating lobby')
    })

    socket.on('isready', (user) =>{
        console.log('finding to ready ' + user.displayName)
        for(let i = 0; i < playernames.length; i++){
            if(playernames[i].playerID == user.playerID){
                playernames[i].isReady = true
                io.emit('playerListUpdate', playernames)
            }
        }
    })



    socket.on('clearingranboard', (callinguserid) =>{
        console.log('clearing a board')
        let randomindex = Math.floor(Math.random() * (playernames.length - 0) + 0);

        //making sure the user doesn't clear their own board
        while(playernames[randomindex].playerID == callinguserid){
            randomindex = Math.floor(Math.random() * (playernames.length - 0) + 0);
        }

        let name = "user name"
        //finding the name of the user that called to clear
        for(let i = 0; i < playernames.length; i++){
            if(playernames[i].playerID == callinguserid){
                name = playernames[i].displayName
            }}

        io.emit('clearing', playernames[randomindex].playerID)
    })


    socket.on('scrambleranboard', (callinguserid) =>{
        console.log('scrambling a board')
        let randomindex = Math.floor(Math.random() * (playernames.length - 0) + 0);

        //making sure the user doesn't scramble their own board
        while(playernames[randomindex].playerID == callinguserid){
            randomindex = Math.floor(Math.random() * (playernames.length - 0) + 0);
        }

        //finding the name of the user that called to scramble
        for(let i = 0; i < playernames.length; i++){
            if(playernames[i].playerID == callinguserid){
                name = playernames[i].displayName
            }}

        io.emit('scrambling', playernames[randomindex].playerID)
    })

    socket.on('isbingo', (user) =>{
        console.log('finding to bingo ' + user.displayName)
        for(let i = 0; i < playernames.length; i++){
            if(playernames[i].playerID == user.playerID){
                playernames[i].haswon = true
                io.emit('playerListUpdate', playernames)
            }
        }
    })


    socket.on('addpoints', (user) =>{
        console.log('adding points to user ' + user.displayName)
        for(let i = 0; i < playernames.length; i++){
            if(playernames[i].playerID == user.playerID){
                playernames[i].points += 5
                io.emit('playerListUpdate', playernames)
            }
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const sockindex = players.indexOf(socket.id)
        if(sockindex !== -1){
            players.splice(sockindex, 1)
            playernames.splice(sockindex, 1)
        }
        io.emit('playerListUpdate',playernames);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });

    socket.on('create-game', () => {
        console.log('creating game: ');
        roomnumber = Math.floor(Math.random() * (2400000 - 1000000) + 1000000);
        console.log('room number is: ' + roomnumber)
      });

    socket.on('playclick', () => {
        io.emit('routeToBoard');
    });


    socket.on('bingocheck', (user) => {
        console.log('a player has won ' + user.displayName)
        io.emit('userwon');
    });

});
 
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});