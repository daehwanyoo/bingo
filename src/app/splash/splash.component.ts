import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { SocketService } from '../socketservice/socketservice.component';
import { Router, RouterModule } from '@angular/router';
import { ElementRef } from '@angular/core';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { GamestateserviceComponent } from '../gamestateservice/gamestateservice.component';


@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, RouterModule],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {
    readonly dialog = inject(MatDialog);
    
    constructor(private socketservice: SocketService, private events:GamestateserviceComponent){
    }

    creategame(){
      this.socketservice.emit('chat message', "creating game")
      this.socketservice.emit('create-game', )
      this.socketservice.addplayer()
    }
}

