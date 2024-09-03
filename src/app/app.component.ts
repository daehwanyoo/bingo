import { Component, OnInit, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { ViewChild } from '@angular/core';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import { SplashComponent } from './splash/splash.component';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ExtraOptions } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { SocketService, SocketserviceComponent } from './socketservice/socketservice.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SplashComponent, MatTabsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'angl18';
  links = ["one", "two"]
  activeLink = this.links[0]
  movieData: any;

  constructor(private router: Router, private viewportScroller: ViewportScroller, private changeDetectorRef: ChangeDetectorRef,
     private socketservice: SocketService, private elRef: ElementRef
  ) {}
    
    ngOnInit() {
    // Connect to the WebSocket server
    this.socketservice.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Emit a test event to the server
      this.socketservice.emit('example-event', { message: 'Hello from client' });
    });
 
    this.socketservice.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
 
    // Listen for a test response from the server
    this.socketservice.on('example-event-response', (data) => {
      console.log('Received example-event-response:', data);
    });
  }
 
  ngOnDestroy() {
    this.socketservice.disconnect();
  }
 
}
  

  


