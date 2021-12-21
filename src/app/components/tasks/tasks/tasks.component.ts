import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService, ITask } from 'src/app/services/task.service';
import { TimerService } from 'src/app/services/timer.service';
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

  collapsed?: boolean;

  private subscription?: Subscription;

  @ViewChild('taskForm') taskForm?: NgForm;
  tasks: ITask[] = [];
  task!: ITask;

  date: any;

  /**TIMER**/
  stop = false;
  clicked = false;
  time_start: any;
  time_end: any;
  time_count: any;
  time_total: any;

  /*getTotalTime() {
    this.time_total = this.tasks.reduce( (sum, task) => sum + task.time_count, 0);
    console.log(this.time_total)
  }*/

  toggle() {
    this.stop = !this.stop;
  }

  onStartClick() {
    this.time_start = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    //console.log(this.time_start)
    this.timerService.startTimer();
  }

  onStopClick() {
    this.date = new Date();
    this.time_end = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    //console.log(this.time_end)
    this.time_count = this.timerService.counter?.toLocaleTimeString('it-IT');
    this.timerService.stopTimer();
  }

  onResetClick() {
    this.timerService.resetTimer();
  }

  constructor(private taskService: TaskService, public timerService: TimerService) { }

  toggleExpandTask(task: ITask) {
    task.isExpandable = !task.isExpandable;
  }

  //get
  ngOnInit() {
    this.subscription = this.taskService.$Tasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
    });
    this.fetchTasks(); //calling fetchTasks()
    //this.getTotalTime()
  }

  fetchTasks() {
    this.taskService.getTasks();
  }

  //onSubmit
  onSubmit() {
    //console.log(this.taskForm);
    this.task = this.taskForm?.value; //shortcut for this.task.name = this.taskForm?.value.name etc. for all properties
    this.task.date = this.date;
    this.task.time_start = this.time_start;
    this.task.time_end = this.time_end;
    this.task.time_count = this.time_count;
    this.taskService.createTask(this.task).subscribe({
      next: (data) => {
        console.log('Task successfully added.');
      },
      error: (error) => {
        console.warn(error);
      },
    });
    this.taskForm?.reset(); //resets the form and its properties and state (like touched,dirty etc.)
  }

  //onUpdate
  onUpdateTask(task: ITask) {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        console.log('Task successfully updated.');
      },
      error: (error) => {
        console.warn(error);
      },
    });
    task.isEditMode = false;
    task.isExpandable = false;
  }

  toggleEditMode(task: ITask) {
    task.isEditMode = !task.isEditMode;
  }

  //onDelete
  onDeleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (data) => {
        console.log('Task successfuly deleted');
      },
      error: (error) => {
        console.error('Error deleting task!', error);
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
