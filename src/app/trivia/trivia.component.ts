import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatCard, MatCardModule} from '@angular/material/card';
import { NgClass } from '@angular/common';
import { ServiceComponent } from '../service/service.component';
import { SocketService, SocketserviceComponent } from '../socketservice/socketservice.component';


@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [RouterModule, MatCard, MatCardModule, NgClass],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})

export class TriviaComponent {
  currentquestion = 0
  isclick = 5
  scramble:boolean[] = [];
  clear:boolean[] = [];
  correct:boolean[] = [];
  isFunConsequenceEnabled = false;
  incorrect:boolean[] = [];
  letter = ["A", "B", "C", "D"]
  questionlist = ["How many service calls do AAA members get per year?", "What is a primary member?", "What is a deductible?", "What is the purpose of collision insurance?", "Which is true of comprehensive coverage?",
  "Which of the following does AAA membership NOT offer discounts for?",
  "If you are a plus member, how many miles can you be towed by AAA?","Which of the following is NOT a level of AAA membership?",
  "Which of the following may be requested when using your AAA card?", 
  "You are a passenger in your friend's car needing assistance. Can you use your AAA card?", 
    "You just upgraded your membership, how long do you need to wait before the Extended Roadside Assistance services are able to be used?",
    "How many service calls do AAA members get per year?",
    "What types of services are included in AAA Roadside Assistance?",
    "How does AAA define 'Extended Roadside Assistance'?",
    "What benefit does AAA Premier membership offer that other levels do not?"
  ];

  options0 = ["2"," 10"," 4", "6"]
  options1 = ["The initial holder of the membership within the householed","Someone who has a basic level membership","An individual who has a membership under another member", "The first memeber of AAA. Ever."]
  options2 = ["The cost paid by insurance no matter the circumstance","The amount of money you owe if you have no insurance","The amount of cost deducted by insurance", "The initial cost paid by an individual before insurance pays"]
  options3 = ["To cover costs of collisions caused by other vehicles only","To cover costs caused by standing objects only","To cover repair costs for all types of collisions", "To protect your car from weather"]
  options4 = ["It is full coverage", "Covers damages caused by natural disasters or wildlife", "Protects your vehicle from collision damages", "Offers a lower premium"]
  options5 = ["Movie Tickets", "Concert Tickets", "Nail Salons", "Theme Parks"]
  options6 = ["70", "100", "150", "50"]
  options7 = ["Classic", "Legendary", "Plus", "Premier"]
  options8 = ["Photo ID", "First and Last name", "Birth Certificate", "Social Security Card"]
  options9 = ["No, AAA is specific to your vehicle", "Yes, my AAA card can be used by the driver", "No, your AAA card can only be used while riding with family", "Yes, AAA follows the member with the card not a specific vehicle"]
  options10 = ["14 days", "7 days", "0 days", "3 days"]
  options11= ["2", "10", "4","6"]
  options12=["Fuel delivery", "Towing and lockout service", "battery jump-start and tire change", "All those above"]
  options13=["Assistance that includes medical emergencies", "Roadside services beyond the basic coverage", "Coverage that extends to international travel", "Services provided to non-members"]
  options14=["A personalized travel planning service that provides maps and directions", "A mobile app for vehicle diagnostics", "A loyalty rewards program", "A type of vehicle insurance offered by AAA"]
  options15=["Unlimited service calls", "Free rental car with tow", "Discounted movie tickets", "Coverage for multiple family members"]

  optionsanswerslist = [
    [false, false, true, false],
    [true, false, false, false],
    [false, false, false, true],
    [false, false, true, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, true, false, false],
    [false, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true], 
    [false, true, false, false], 
    [true, false, false, false],
    [false, true, false, false], 
  ]

  optionsvalue = [true, false, false, true, false, true, false, false, false, true,false, true, true, false, false]

  optionslist = [this.options0, this.options1, this.options2, this.options3, this.options4, 
    this.options5, this.options6, this.options7, this.options8, this.options9, this.options10,
     this.options11, this.options12, this.options13, this.options14, this.options15]

  i = this.service.getcurrentquestion();
  opt = 0

  constructor(private service:ServiceComponent, private socketservice:SocketService){
    this.correct = new Array(this.questionlist.length).fill(false)
    this.currentquestion = this.i
    this.isFunConsequenceEnabled = this.socketservice.getfun()
   }

  getquestion(){
    let question = this.questionlist[this.i];
    this.currentquestion = this.i
    return question
  }

  getoptionlist(){
   return this.optionslist[this.i]
  }


  getoption(index:number){
    let optionlist =  this.optionslist[this.i]
    return optionlist[index]
  }

  nextquestion(){
    this.service.iteratequestion();
    if(this.iscorrect()){
      this.service.markrandom();
    }
  }

  getquestionnumber(){
    return this.service.trackquestion.length
  }

  getletter(index:number){
    return this.letter[index];
  }

  checkanswer(answer:number){
    let list = this.optionsanswerslist[this.currentquestion];
    this.isclick = answer;
    if (list[answer]) {
      this.correct[this.currentquestion] = true;
      
      if(this.optionsvalue[this.currentquestion]){
        this.clear[this.currentquestion] = true;
      }else{
        this.scramble[this.currentquestion] = true
      }

      return true
    } else {
      this.incorrect[this.currentquestion] = true
      return false;
    }
  }

  iscorrect(){
   return this.correct[this.currentquestion]
  }

  isincorrect(){
    return this.incorrect[this.currentquestion]
  }

  isclicked(index:number){
    if(index == this.isclick){
      return true
    }else{
      return false
    }
  }

  isclear(){
    if(this.isFunConsequenceEnabled){
      return this.clear[this.currentquestion]
    }else{
      return false
    }
  }

  isscramble(){
    if(this.isFunConsequenceEnabled){
      return this.scramble[this.currentquestion]
    }else{
      return false
    }
  }

  scrambleranboard(){
    this.socketservice.emit('chat message', "scramble in trivia")
    this.scramble[this.currentquestion] = false
    this.service.resetscramble()
    this.socketservice.scrambleranboard()
  }

  clearranboard(){
    this.socketservice.emit('chat message', "clear in trivia")

    this.clear[this.currentquestion] = false
    this.service.resetclear()
    this.socketservice.clearrandomboard()
   }

 
}
