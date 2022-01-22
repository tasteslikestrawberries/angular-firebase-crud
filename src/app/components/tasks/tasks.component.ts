import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from 'src/app/shared/models/ITask';
import { TaskService } from 'src/app/shared/services/task.service';
import { TimerService } from 'src/app/shared/services/timer.service';
import { Subscription } from 'rxjs';

import {
  faTable,
  faCaretDown,
  faTrashAlt,
  faPen
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  taskIcon = faTable;
  faCaretDown = faCaretDown;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  private taskSub$?: Subscription;

  @ViewChild('taskForm') taskForm?: NgForm;

  tasks: ITask[] = [];
  task!: ITask;
  date?: Date;

  //SEARCH
  userInput = '';
  results?: ITask[];

  //TIMER
  startButtonDisabled = false;
  time_start?: string;
  time_end?: string;
  time_count?: string;
  time_total?: string;

  constructor(private taskService: TaskService, public timerService: TimerService) { }

  //SEARCH
  onSearch(event: Event) {
    this.userInput = (<HTMLInputElement>event.target).value;
    if (!this.tasks) return

    this.results = this.tasks.filter(task => {
      if (task.name.toLowerCase().includes(this.userInput)) return true;
      if (task.description && task.description.toLowerCase().includes(this.userInput)) return true;

      return false
    })
  }

  onStartClick() {
    this.timerService.startTimer();
  }

  onStopClick() {
    if (!this.timerService.startTime) {
      return
    }

    this.date = new Date();
    this.time_start = this.timerService.startTime;
    this.time_end = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    this.time_count = this.timerService.date?.toLocaleTimeString('it-IT');
    this.timerService.stopTimer();
  }

  toggleExpandTask(task: ITask) {
    task.isExpanded = !task.isExpanded;
  }

  //get
  ngOnInit() {
    this.taskSub$ = this.taskService.$Tasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.results = data;
      },
    });
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks();
  }

  //onSubmit
  onSubmit() {
    if (!this.timerService.startTime) {
      return
    }
    this.task = this.taskForm?.value;
    this.task.date = this.date;
    this.task.time_start = this.time_start;
    this.task.time_end = this.time_end;
    this.task.time_count = this.time_count;

    this.taskService.createTask(this.task).subscribe({
      error: err => console.error(err)
    });
    this.taskForm?.reset(); //resets the form and its properties and state (like touched,dirty etc.)
    this.timerService.resetTimer();
  }

  //onUpdate
  onUpdateTask(task: ITask) {
    this.taskService.updateTask(task).subscribe({
      error: err => console.error(err)
    });

    task.isExpanded = false;
  }

  //onDelete
  onDeleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      error: err => console.error('Error deleting task!', err)
    });
  }

  ngOnDestroy() {
    this.taskSub$?.unsubscribe();
  }
}
