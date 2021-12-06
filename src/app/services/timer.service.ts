import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timer?: any;
  counter?: Date;

  constructor() {}

  startTimer() {
    this.timer = timer(0, 1000).subscribe((t) => {
      this.counter = new Date(0, 0, 0, 0, 0, 0);
      this.counter.setSeconds(t);
    });
  }

  stopTimer() {
    //TODO: call function with post request here
    this.timer.unsubscribe();
  }

  resetTimer() {
    this.counter = new Date(0, 0, 0, 0, 0, 0);
  }
}
