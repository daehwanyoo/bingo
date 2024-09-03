import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { User } from '../user.interface';
import { NgClass } from '@angular/common';
import { Tile } from '../tile.interface';
import { Router, RouterModule } from '@angular/router';
import { ServiceComponent } from '../service/service.component';
import { SocketService } from '../socketservice/socketservice.component';
import { PopupComponent } from '../popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatGridListModule, NgClass, RouterModule, MatButtonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  tile!: Tile;
  user!: User;
  num = 0;
  numlist: Tile[] = [];
  toplist: Tile[] = [];
  playerlist: User[] = [];
  letterlist: string[] = [];
  marked = false;
  cleared = false;
  whocleared = ' ';
  bingostatus = false;
  won = false;
  setting = 10000;
  private timeset: any;
  private clearamount: any;
  isFunConsequenceEnabled = false;
  readonly dialog = inject(MatDialog);
  isMuted = false;

  constructor(
    private service: ServiceComponent,
    private router: Router,
    private socketservice: SocketService,
    private audioService: AudioService
  ) {
    this.numlist = this.service.getboardtiles();
    this.letterlist = this.service.getletterlist();
    this.toplist = this.service.gettoptiles();
    this.playerlist = this.socketservice.update();
    this.setupdate();
    this.isFunConsequenceEnabled = this.socketservice.getfun();
  }

  ngOnInit(): void {
    this.isMuted = this.audioService.getMuteState();
    this.applyMuteState();
  }

  openDialog() {
    this.dialog.open(PopupComponent);
  }

  private setupdate() {
    if (this.timeset) {
      clearInterval(this.timeset);
    }

    this.timeset = setInterval(() => {
      this.playerlist = this.socketservice.update();
    }, 100);
  }

  private cleartime() {
    if (this.clearamount) {
      clearTimeout(this.clearamount);
    }

    this.cleared = true;

    this.clearamount = setTimeout(() => {
      this.cleared = false;
    }, 3000);
  }

  checkbingo() {
    this.socketservice.checkbingo(this.bingostatus);
  }

  bingo() {
    if (this.service.checkbingo()) {
      this.bingostatus = true;
    }
    return this.service.checkbingo();
  }

  getredzone() {
    return this.service.getredzone();
  }

  getind(num: number) {
    return this.numlist[num];
  }

  isfreespace(index: number) {
    return this.service.isfreespace(index);
  }

  ismarked(ind: number) {
    return this.service.getmarked(ind);
  }

  marktile(event: MouseEvent, ind: number) {
    event.preventDefault();
    const currtile = this.gettile(ind);
    const top = this.service.gettoptiles().find((tile) => tile === currtile);

    if (ind == 12) {
      return;
    }

    if (top !== undefined) {
      this.service.mark(ind);
      this.socketservice.addpoints(this.user);
    } else {
      if (this.isFunConsequenceEnabled) {
        this.service.clearthisboard();
      } else {
        this.socketservice.emit('chat message', this.isFunConsequenceEnabled);
      }
    }
  }

  gettile(ind: number) {
    return this.service.gettile(ind);
  }

  gettoptile(ind: number) {
    return this.service.gettoptile(ind);
  }

  optionsleft() {
    return this.service.optionsleft();
  }

  checkcleared() {
    if (this.cleared) {
      this.cleartime();
    }
    return this.cleared;
  }

  toggleSound() {
    const audioElement = document.getElementById('background-audio') as HTMLAudioElement;
    const soundIcon = document.getElementById('sound-icon') as HTMLImageElement;

    if (this.isMuted) {
      audioElement.muted = false;
      soundIcon.src = '/assets/sound-on.png';
    } else {
      audioElement.muted = true;
      soundIcon.src = '/assets/sound-off.png';
    }
    this.isMuted = !this.isMuted;
    this.audioService.setMuteState(this.isMuted);
  }

  private applyMuteState() {
    const audioElement = document.getElementById('background-audio') as HTMLAudioElement;
    const soundIcon = document.getElementById('sound-icon') as HTMLImageElement;

    if (this.isMuted) {
      audioElement.muted = true;
      soundIcon.src = '/assets/sound-off.png';
    } else {
      audioElement.muted = false;
      soundIcon.src = '/assets/sound-on.png';
    }
  }
}
