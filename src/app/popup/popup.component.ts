import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { ServiceComponent } from '../service/service.component';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
  standalone: true,
  imports: [MatDialogTitle, NgClass, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PopupComponent implements OnInit {
  countdown: number = 5;
  countdownInterval: any;
 
  constructor(private service: ServiceComponent, private dialogRef: MatDialogRef<PopupComponent>) {}
 
  ngOnInit() {
    this.startCountdown();
  }
 
  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 1) {
        this.countdown--;
      } else {
        this.dialogRef.close();
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
  isclear(){
    return this.service.getpopupevent() == 0
  }

  isscramble(){
    return this.service.getpopupevent() == 1
  }



}

