import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ITask {
  id: string;
  name: string;
  description: string;
  date?: Date;
  time_start?: string;
  time_end?: string;
  time_count?: string;
  isExpanded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private subject = new BehaviorSubject<ITask[]>([]);
  private url =
    'https://angular-crud-d10d8-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

  constructor(private http: HttpClient) { }

  private getUrlTaskId(id: string) {
    return `https://angular-crud-d10d8-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`;
  }

  refresh() {
    this.subject.next(this.tasks); // informs subscribers that new tasks have arrived (changed) and passes tasks array to them
  }

  //GET REQUEST
  getTasks() {
    this.http.get(this.url).subscribe({
      //here subscribe is substitute for then/catch/finally, just to get response
      next: (data) => {
        if (!data) return;
        //console.log(data) // data structure is: {id: {task}}
        //methods Object.keys/values/entries returns an array from object
        //see data structure and what needs to be extracted from it
        //if data already is an array: skip this step and just write: const tasks=data;
        const tasks: ITask[] = Object.entries(data).map( ([id, task]) => {
          return {
            id: id,
            ...task,
            isExpanded: false
          }; //returning array of objects with id inside
        });
        //console.log(tasks)
        this.tasks = tasks;
        this.refresh();
      },
    });
  }

  getTask(id: string) {
    this.http
      .get(this.getUrlTaskId(id))
      .subscribe();
    this.refresh();
  }

  //POST REQUEST
  createTask(task: ITask) {
    return this.http.post(this.url, task).pipe(
      tap({
        next: () => {
          this.getTasks();
        },
      })
    );
  }

  //PUT REQUEST
  updateTask(task: ITask) {
    return this.http.put(this.getUrlTaskId(task.id), task).pipe(
      tap({
        next: () => {
          this.getTask(task.id);
        },
      })
    );
  }

  //DELETE REQUEST
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.refresh();
    //console.log(id);
    return this.http.delete(this.getUrlTaskId(id));
  }

  $Tasks() {
    return this.subject.asObservable();
  }
}