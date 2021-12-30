import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timer$?: any;
  counter?: Date;

  constructor() {}

  startTimer() {
    this.timer$ = timer(0, 1000).subscribe({ 
      next: (timer: any) => {
      this.counter = new Date(0, 0, 0, 0, 0, 0);
      this.counter.setSeconds(timer);
    }});
  }

  stopTimer() {
    this.timer$.unsubscribe();
  }

  resetTimer() {
    this.counter = new Date(0, 0, 0, 0, 0, 0);
  }
}
