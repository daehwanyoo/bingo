import { Component } from '@angular/core';
import { User } from '../user.interface';
import { SocketService } from '../socketservice/socketservice.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-endpage',
  standalone: true,
  imports: [RouterModule, NgClass, MatCardModule, MatGridListModule],
  templateUrl: './endpage.component.html',
  styleUrl: './endpage.component.css'
})
export class EndpageComponent {
  winnerlist:User[] = []
  first = -1
  second = -1
  third = -1
  user:any
  fakelist:any

  constructor(private socketservice:SocketService){
    this.fakelist = [1,2,3,4, 6, 7]
    this.winnerlist = this.socketservice.update()
    this.displaycalculation()
  }

  displaycalculation(){
    this.winnerlist = this.socketservice.update()
    let winnerlistcopy = this.socketservice.update()
    for(let i = 0; i < winnerlistcopy.length; i++){
      for(let j = 0; j < winnerlistcopy.length; j++){
        if(winnerlistcopy[j].points < this.winnerlist[i].points){
          let user = winnerlistcopy[i]
          winnerlistcopy[i] = winnerlistcopy[j]
          winnerlistcopy[j] = user
        }
      }
    }
    this.winnerlist = winnerlistcopy
  }

  getwinnerlistlength(){
    return this.winnerlist.length
  }

  getplayerpoints(index:number){
    return this.winnerlist[index].points
  }

  getplayername(index:number){
   return this.winnerlist[index].displayName
  }

  getplayerimg(index:number){
   return this.winnerlist[index].playerimg
  }


  isyou(index:number){
    if (this.socketservice.getuser().playerID === this.winnerlist[index].playerID){
      return true
    }else{
      return false
    }
  }

  reset(){
    this.socketservice.reset()
  }


}