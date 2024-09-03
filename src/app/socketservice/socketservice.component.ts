import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { User } from '../user.interface';
import { ServiceComponent } from '../service/service.component';
import { Tile } from '../tile.interface';
import { OnInit } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})

export class SocketService implements OnInit{
  names:string[] = ["auto", "car", "wheel", "horn"]
  imgs: string[] = ["/assets/car1.png", "/assets/car2.png", "/assets/car3.png", "/assets/car4.png", "/assets/car5.png",
  "/assets/car6.png", "/assets/car7.png", "/assets/car8.png", "/assets/car9.png", "/assets/car10.png", "/assets/car11.png",
  "/assets/car12.png", "/assets/car13.png"
  ]
  playerlist:User[] = []
  socketlist = []
  funeable = false
  lost = false
  readyplayers:User[] = []
  private socket: Socket;
  private user: User = {
    playerID : Math.floor(Math.random() * (300000 - 2000) + 2000),
    displayName : this.setname(Math.floor(Math.random() * (3 - 0) + 0)),
    isMuted: false,
    isReady: false,
    playerimg: this.getimg(Math.floor(Math.floor(Math.random() * (12 - 0) + 0))),
    haswon: false,
    boardmarked: [],
    points: 0
  }
  private won = false

  
  constructor(private service:ServiceComponent) {
    this.socket = io('http://localhost:3000');
    // Listen for the updated player list from the server
    this.socket.on('playerListUpdate', (players: User[]) => {
      console.log('updating list')
      this.playerlist = players;
    });
    // listen for updated ready list
    this.socket.on('readyupdate', (players: User[]) => {
      console.log('updating ready list')
      this.readyplayers = players;
    });

    this.socket.on('funupdate', () =>{
      this.funeable = !this.funeable
    });

  
}

ngOnInit(): void {
  
}

update(){
  this.socket.on('playerListUpdate', (players: User[]) => {
    console.log('updating list')
    this.playerlist = players;
  });
    return this.playerlist
}

on(event: string, callback: (...args: any[]) => void) {
this.socket.on(event, callback);
}

emit(event: string, ...args: any[]) {
this.socket.emit(event, ...args);
}

disconnect() {
this.socket.disconnect();

}

  setname(int:number){
    return this.names[int] + Math.floor(Math.random() * (100 - 0) + 0)
  }

  getname(){
    return this.user.displayName
  }

  getimg(int:number){
    return this.imgs[int]
  }

  addplayer(){
    this.socket.emit('addPlayer', this.user)
    this.update()
  }

  ready(){
    this.socket.emit('isready', this.user)
    this.update()
  }

  getuser(){
    return this.user
  }

  checkbingo(bingostatus:boolean){
    if(bingostatus){
      this.socket.emit('bingocheck', this.user)
      return true
    }
    return false
  }

  addpoints(user:User){
    this.socket.emit('addpoints', this.user)
  }

  reset(){
    this.socket.emit('reset')
  }

  clearrandomboard(){
    this.socket.emit('clearingranboard', this.getuser().playerID)
  }

  scrambleranboard(){
    this.socket.emit('scrambleranboard', this.getuser().playerID)
  }

  getfun(){
    return this.funeable
  }


}


export class SocketserviceComponent {
}