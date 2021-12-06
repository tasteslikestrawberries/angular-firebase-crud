import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  stop = false;
  clicked = false;
  displayTime:any;

  constructor(public timerService: TimerService, router: Router) {
    /*router.events.subscribe(val => {
      if (router.url != "/timesheet") {
          this.clicked = true;
      } 
    });*/
  }

  toggle() {
    this.stop = !this.stop;
  }

  onStartClick() {
    this.timerService.startTimer();
  }

  onStopClick() {
    this.displayTime = this.timerService.counter?.toLocaleTimeString('it-IT');
    this.timerService.stopTimer();
  }

  onResetClick() {
    this.timerService.resetTimer();
  }
}

