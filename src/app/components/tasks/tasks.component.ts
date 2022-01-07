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
  submitted = false;
  tasks: ITask[] = [];
  task!: ITask;
  date?: Date;

  /**SEARCH */
  query = '';
  results?: ITask[];

  constructor(private taskService: TaskService, public timerService: TimerService) { }

  onSearch(event: Event) {
    this.query = (<HTMLInputElement>event.target).value;
    if (!this.tasks) return

    this.results = this.tasks.filter(task => {
      if (task.name.toLowerCase().includes(this.query)) return true;
      if (task.description && task.description.toLowerCase().includes(this.query)) return true;

      return false
    })
  }

  /**TIMER**/
  startButtonDisabled = false;
  time_start?: string;
  time_end?: string;
  time_count?: string;
  time_total?: string;

  /*getTotalTime() {
    this.time_total = this.tasks.reduce( (sum, task) => sum + task.time_count, 0);
    console.log(this.time_total)
  }*/

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
    this.time_count = this.timerService.counter?.toLocaleTimeString('it-IT');
    this.timerService.stopTimer();
  }

  toggleExpandTask(task: ITask) {
    task.isExpandable = !task.isExpandable;
  }

  //get
  ngOnInit() {
    this.subscription = this.taskService.$Tasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.results = data;
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
    if (!this.timerService.startTime) {
      return
    }
    this.submitted = true;
    //console.log(this.taskForm);
    this.task = this.taskForm?.value; //shortcut for this.task.name = this.taskForm?.value.name etc. for all properties
    this.task.name = this.taskForm?.value.name
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
    this.timerService.resetTimer();
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

    task.isExpandable = false;
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
