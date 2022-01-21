import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerSub$?: Subscription;
  date?: Date;
  startTime?: string | null;

  constructor() { }

  startTimer() {
    if (this.timerSub$ && !this.timerSub$.closed) { //ensure there is no memory leak
      this.stopTimer();
    }

    this.timerSub$ = timer(0, 1000).subscribe({
      next: (timer: any) => {
        this.date = new Date(0, 0, 0, 0, 0, 0);
        this.date.setSeconds(timer);
      }
    });
    this.startTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  stopTimer() {
    this.timerSub$?.unsubscribe();
  }

  resetTimer() {
    this.stopTimer();
    this.date = new Date(0, 0, 0, 0, 0, 0);
    this.startTime = null;
  }
}
