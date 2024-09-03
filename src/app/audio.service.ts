import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private isMuted = true;

  constructor() {}

  setMuteState(state: boolean) {
    this.isMuted = state;
  }

  getMuteState(): boolean {
    return this.isMuted;
  }
}
