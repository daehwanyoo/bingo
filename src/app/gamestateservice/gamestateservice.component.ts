import { Component } from '@angular/core';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { ICard } from '../interfaces/Card';
// import { IGameState } from '../interfaces/GameState';
import { User } from '../user.interface';
import { SocketService } from '../socketservice/socketservice.component';

@Injectable({
    providedIn: 'root'
})

@Component({
  selector: 'app-gamestateservice',
  standalone: true,
  imports: [],
  templateUrl: './gamestateservice.component.html',
  styleUrl: './gamestateservice.component.css'
})
export class GamestateserviceComponent {
// OBSERVABLE SUBSCRIPTIONS
// private _gameStateSubscription: Subscription;
// private _playerStateSubscription: Subscription;

// GAME STATE
// public cardsInPlay$ = new BehaviorSubject<ICard[]>([]);
public gamePhase$ = new BehaviorSubject<string>('');
public players$ = new BehaviorSubject<User[]>([]);
public roomCode$ = new BehaviorSubject<string>('');

// PLAYER STATE
// public playerHand$ = new BehaviorSubject<ICard[]>([]);

constructor(private socketservice: SocketService) {
    // this._gameStateSubscription = this._handleGameState();
    // this._playerStateSubscription = this._handlePlayerState();
}

// ngOnDestroy(): void {
//     this._gameStateSubscription.unsubscribe();
//     this._playerStateSubscription.unsubscribe();
// }

// private _handleGameState(): Subscription {
//     return this.socketservice
//         .observeGameState()
//         .subscribe((state: IGameState) => {
//             this.cardsInPlay$.next(state.cardsInPlay);
//             this.gamePhase$.next(state.gamePhase);
//             this.blueCard$.next(state.blueCard);
//             this.judge$.next(state.judge);
//             this.lastCardChosen$.next(state.lastCardChosen);
//             this.players$.next(state.players);
//             this.roomCode$.next(state.roomCode);
//         });
// }

// private _handlePlayerState(): Subscription {
//     return this._acgToAcgEvents
//         .observePlayerState()
//         .subscribe((state: IPlayer) => {
//             this.playerHand$.next(state.hand);
//         });
// }
}
