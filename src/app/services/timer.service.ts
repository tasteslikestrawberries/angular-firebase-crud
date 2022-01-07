import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer$?: Subscription;
  counter?: Date;
  startTime: any;

  constructor() {}

  startTimer() {
    if (this.timer$ && !this.timer$.closed) { //ensure there is no memory leak
      this.timer$.unsubscribe()
    }

    this.timer$ = timer(0, 1000).subscribe({ 
      next: (timer: any) => {
      this.counter = new Date(0, 0, 0, 0, 0, 0);
      this.counter.setSeconds(timer);
    }});
    this.startTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  stopTimer() {
    this.timer$?.unsubscribe();
  }

  resetTimer() {
    this.counter = new Date(0, 0, 0, 0, 0, 0);
    this.startTime = null;
    this.timer$ = undefined;
  }
}
