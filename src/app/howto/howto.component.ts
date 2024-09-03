import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-howto',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  templateUrl: './howto.component.html',
  styleUrl: './howto.component.css'
})
export class HowtoComponent {

}
