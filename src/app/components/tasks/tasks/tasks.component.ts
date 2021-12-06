import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService, ITask } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';

import {
  faTable,
  faPlusCircle,
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

  myDate = new Date();
  timesheetIcon = faTable;
  faPlusCircle = faPlusCircle;
  faCaretDown = faCaretDown;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  collapsed?: boolean;

  private subscription?: Subscription;

  @ViewChild('taskForm') taskForm?: NgForm;
  tasks: ITask[] = [];
  task!: ITask;
  totalTime: any;

  constructor(private taskService: TaskService) {}


  toggleExpandTask(task: ITask) {
    task.isExpandable=!task.isExpandable;
  }

  //get
  ngOnInit() {
    this.subscription = this.taskService.$Tasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
    });

    this.fetchTasks(); //calling fetchTasks()
  }

  fetchTasks() {
    this.taskService.getTasks();
  }

  //onSubmit
  onSubmit() {
    //console.log(this.taskForm);
    this.task = this.taskForm?.value; //shortcut for this.task.name = this.taskForm?.value.name etc. for all properties
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
