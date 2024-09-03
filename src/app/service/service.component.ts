import { User } from '../user.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Tile } from '../tile.interface';
import { CreateComponent } from '../create/create.component';
import { Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { SocketService } from '../socketservice/socketservice.component';

@Injectable({
  providedIn: 'root'
})

export class ServiceComponent {
  toptilelist:Tile[] = []
  boardtilelist:Tile[] = []
  pastusedtile:Tile[] = []
  gameover = false
  boardcleared = false
  boardscrambled = false
  won = false;
  popevent = 0
  isfunenable = false
  questionnumber = 0;
  trackquestion:number[] = []
  tile!: Tile;
  num = 0;
  setting = 0
  private timeset:any
  private timeset2:any
  redzone = false
  timset:any
  i = 0;
  numlist:number[] = []
  letterlist:string[] = ["B", "I", "N", "G", 
  "O", "B", "I", "N", "G", 
  "O", "B", "I", "N", "G", 
  "O","B", "I", "N", "G", 
  "O", "B", "I", "N", "G", 
  "O"]

  constructor(private router: Router){
    this.fillList();
    this.filltoptiles();
    this.trackquestion = [];
    clearInterval(this.timeset2);
    this.settime();
  }

  winner(user:User){
    this.won = true;
  }

  gettoptiles(){
    return this.toptilelist;
  }

  getboardtiles(){
    return this.boardtilelist;
  }

  getletterlist(){
    return this.letterlist;
  }


  filltoptiles(){
    this.toptilelist = []
    while(this.i < 5){
      this.num = this.generatenum(1,100)   
      while(this.toptilelist.find(num => num.number == this.num)){
        this.num = this.generatenum(1,100)
      }
      //gets rid of duplicates
      const currtile: Tile = {
        number: this.num,
        letter: this.getranletter(),
        marked: false,
        freespace: false
      }

      //if already used dont put back in the top tiles
      let used = this.pastusedtile.find(tile => tile == currtile)
      while(used){
        this.filltoptiles()
      }
      if(this.num <= 24 && this.num >= 0){
        //add in feature to check if the number already exists in the toplist array
        while(this.toptilelist.find(num => num.number == this.gettile(this.num).number) && this.pastusedtile.find((num => num == this.gettile(this.num)))){
          this.num = this.generatenum(1,10)
        }
        //making sure not to pull a free space since their number is 0
        while(this.gettile(this.num).freespace){
          this.num = this.generatenum(1,10)
        }
        this.toptilelist.push(this.gettile(this.num))
        this.pastusedtile.push(this.gettile(this.num))
      }else{
        this.toptilelist.push(currtile)
        this.pastusedtile.push(this.gettile(this.num))
      }
      this.i++
    }
    this.i = 0
    this.num = 0
  }

  fillList(){
    this.numlist = []
    while(this.i < 25){
      this.num = this.generatenum(1,100)
      while(this.boardtilelist.find(num => num.number == this.num)){
        this.num = this.generatenum(1,100)
      }
      //gets rid of repeats
      if(this.i == 12){
        const freespace: Tile = {
          number: 0,
          letter: " ",
          marked: false,
          freespace: true
        }
        this.boardtilelist.push(freespace)
      }else{
        const currtile: Tile = {
          number: this.num,
          letter: this.letterlist[this.i],
          marked: false,
          freespace: false
      }
      this.boardtilelist.push(currtile)
      }
      this.i++
    }
    this.i = 0
    this.num = 0
  }

  generatenum(min: number, max: number){
    return Math.floor(Math.random() * (max - min) + min);
  }

  mark(ind : number){
    this.boardtilelist[ind].marked = true

  }



  randomunmark(){
   let ind = Math.floor(Math.random() * (25 - 1) + 1);
   for(let i = 0; i < this.boardtilelist.length; i++){
    if(this.boardtilelist[i].marked){
      this.boardtilelist[i].marked = false
    }
   }
  }

  getmarked(ind:number){
    return this.boardtilelist[ind].marked
  }

  getranletter(){
    this.num = Math.floor(Math.random() * (25 - 1) + 1);
    return this.letterlist[this.num]

  }

  gettile(ind: number){
    return this.boardtilelist[ind]
  }

  gettoptile(ind: number){
    return this.toptilelist[ind]
  }

  checkbingo() {
    const heitwidth = 5;
  
    console.log("Checking Bingo...");
  
    // Checking horizontal win
    for (let row = 0; row <= 20; row += 5) {
      let checked = true;
      console.log(`Checking horizontal row starting at index ${row}`);
      for (var col = row; col < (row + 5); col ++) {
        if(this.boardtilelist[col].freespace){
          checked = true;
        }else{
        if (!this.boardtilelist[col].marked) {
          checked = false;
          break;
        }
      }
      }
      if (checked) {
        console.log("Horizontal win detected");
        this.won = true;
        return true;
      }
    }
  
    // Checking vertical win
    for(let col = 0; col < heitwidth; col++){
      let checked = true;
      console.log(`Checking vertical row starting at index ${col}`);
      for(let row = col; row <= 24; row += 5){
        if(this.boardtilelist[row].freespace){
          checked = true;
        }else{
        console.log(`row =  ${row}`);
        console.log(`state of tile ${this.boardtilelist[row].marked}`);
        if(!this.boardtilelist[row].marked){
          checked = false;
          break;
        }
      }
      }

      if(checked == true){
        this.won = true;
        return true
      }
    }
  
    // Checking diagonal to right
    let checkedright = true;
    console.log("Checking diagonal from top-left to bottom-right");
    for (let i = 0; i <= 24; i += 6) {
      console.log(`state of tile ${this.boardtilelist[i].marked}`);
      if(this.boardtilelist[i].freespace){
        checkedright = true;
      }else{
        if (!this.boardtilelist[i].marked) {
          checkedright = false;
          break;
        }
      }
    }
    if (checkedright) {
      console.log("Diagonal (top-left to bottom-right) win detected");
      this.won = true;
      return true;
    }
  
    // Checking diagonal to left
    let checkedleft = true;
    console.log("Checking diagonal from top-right to bottom-left");
    for (let i = 4; i <= 20; i += 4) {
      console.log(`Checking index index ${i}`);
      console.log(`state of tile ${this.boardtilelist[i].marked}`);
      if(this.boardtilelist[i].freespace){
        checkedleft = true;
      }else{
      if (!this.boardtilelist[i].marked) {
        checkedleft = false;
        break;
      }
    }
    }
    if (checkedleft) {
      console.log("Diagonal (top-right to bottom-left) win detected");
      this.won = true;
      return true;
    }
  
    return false;
  }
  

  iteratequestion(){
    this.questionnumber++
  }

  getcurrentquestion(){
    let question = Math.floor(Math.random() * (14 - 0) + 0)
    while(this.trackquestion.find(num => num == question)){
      question = Math.floor(Math.random() * (14 - 0) + 0)
    }
    this.trackquestion.push(question)
    return question
  }

  markrandom(){
    let i = Math.floor(Math.random() * (24 - 1) + 1)
      while(this.boardtilelist[i].marked || i == 12){
        i = Math.floor(Math.random() * (24 - 1) + 1)
      }
      this.boardtilelist[i].freespace = true
    }

    isfreespace(index:number){
      return this.boardtilelist[index].freespace
    }

    //timer

  refreshtop(){
    this.filltoptiles()
  }

  private setcolortime(){
    if (this.timeset2) {
      clearInterval(this.timeset2);
    }

    this.timeset2 = setInterval(() => {
      this.redzone = true;
      setTimeout(() => {
        this.redzone = false
      }, 3000);
    }, 7000);

  }

    private settime() {
      if (this.timeset) {
        clearInterval(this.timeset);
      }

      this.timeset = setInterval(() => {
        this.refreshtop();
        this.setcolortime();
      }, 10000);

      this.setcolortime();

    }

    getredzone(){
      return this.redzone
    }

    optionsleft(){
      console.log(this.trackquestion.length)
      if(this.trackquestion.length == 5){
        return true
       }else{
         return false
       }
    }


    //reset
    resetall(){
      this.toptilelist = []
      this.boardtilelist = []
      this.won = false;
      this.questionnumber = 0;
      this.trackquestion = []
      this.num = 0;
      clearInterval(this.timeset)
      this.i = 0;
      this.numlist= []
      this.fillList();
      this.filltoptiles();
      this.trackquestion = [];
      this.settime();
      this.popevent = -1
    }

    //clear and scramble

      setboardcleared(){
        this.boardcleared = true
      }

      setboardscrambled(){
        this.boardscrambled = true
      }

      getboardcleared(){
        return this.boardcleared
      }

      getboardscrambled(){
        return this.boardscrambled
      }

      resetscramble(){
        this.boardscrambled = false
      }

      resetclear(){
        this.boardcleared = false
      }

      popupevent(name:string){
        if(name == "scramble"){
          this.popevent = 1
        }else{
          this.popevent = 0
        }
      }

      getpopupevent(){
        return this.popevent
      }

    
      clearthisboard(){
        for(let i = 0; i < this.boardtilelist.length; i++){
          if(this.boardtilelist[i].marked){
            this.boardtilelist[i].marked = false
          }
        }
      }

      scramblethisboard(){
        for(let i = 0; i < this.boardtilelist.length; i++){
          for(let j = 0; j < 5; j++){
            let tile = this.boardtilelist[i]
            this.boardtilelist[i] = this.boardtilelist[j]
            this.boardtilelist[j] = tile
          }
        }
      }

}

