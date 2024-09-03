import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router, RouterModule } from '@angular/router';
import { ServiceComponent } from '../service/service.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SocketService } from '../socketservice/socketservice.component';
import { User } from '../user.interface';
import { NgClass, CommonModule } from '@angular/common';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, NgClass, MatButtonToggleModule, RouterModule, MatCardModule, MatGridListModule, MatSlideToggleModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  num = 0;
  lobbyLink: string | null = null;
  copy = false;
  playerlist: User[] = [];
  ready: User[] = [];
  timeset: any = null;
  isready = false;
  isFunConsequenceEnabled = false;

  private setupdate() {
    if (this.timeset) {
      clearInterval(this.timeset);
    }
    this.timeset = setInterval(() => {
      this.showplayset();
      this.playerlist = this.socketservice.update();
    }, 100);
  }

  constructor(private service: ServiceComponent, private router: Router, private socketservice: SocketService) {
    this.socketservice.addplayer();
    this.playerlist = this.socketservice.update();
    this.setupdate();

    this.socketservice.on('routeToBoard', () => {
      this.router.navigate(['/board']);
    });
  }

  showplayset() {
    if (this.playerlist.length < 4) {
      return false;
    }

    for (let i = 0; i < this.playerlist.length; i++) {
      if (this.playerlist[i].isReady == false) {
        return false;
      }
    }
    return true;
  }

  clickplay() {
    if(this.playerlist.length >= 4){
      this.socketservice.emit('playclick');
      this.service.resetall();
    }else{
      return
    }
  }

  userready(user: User) {
    for (let i = 0; i < this.playerlist.length; i++) {
      if (this.playerlist[i].playerID == user.playerID) {
        return this.playerlist[i].isReady;
      }
    }
    return false;
  }

  readyup() {
    this.isready = true;
    this.socketservice.ready();
    this.playerlist = this.socketservice.update();
  }

  isreadyup() {
    return this.isready;
  }

  isyou(user: User) {
    return this.socketservice.getuser().playerID === user.playerID;
  }

  toggleFunConsequence(event: MatSlideToggleChange) {
    this.isFunConsequenceEnabled = event.checked;
    this.socketservice.emit('funConsequenceUpdate', this.isFunConsequenceEnabled);
  }

  isLeader(): boolean {
    return this.playerlist[0]?.playerID === this.socketservice.getuser().playerID;
  }

  trackByFn(index: number, item: User) {
    return item.playerID; // or item.id
  }
}
