import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ITask {
  id: string;
  name: string;
  description: string;
  time_start: any;
  time_end: any;
  time_count: any;
  isEditMode: boolean;
  isExpandable: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private subject = new BehaviorSubject<ITask[]>([]);
  private url =
    'https://angular-crud-d10d8-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

  constructor(private http: HttpClient) {}

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

        //pretvaramo objekt objekata u array objekata (ITask) - methods Object.keys/values/entries return an array
        //Object.entries returns 2-dimensional array in which the inner one is [key,value]
        //here data is {id: <ITask> without id} --> id is key, <ITask> with omitted id is value
        //if we have array: skip this step and just write: const tasks=data;
        const tasks: ITask[] = Object.entries(
          data as Record<string, Omit<ITask, 'id' | 'editable'>>
        ).map(([id, task]) => {
          return {
            id: id,
            ...task,
            isEditMode: false,
            isExpandable: false,
          }; //returning new object with properties from ITaskWithOmittedId + id = and we get ITask
        });

        this.tasks = tasks;
        this.refresh();
      },
    });
  }

  getTask(id: string) {
    this.http
      .get(
        `https://angular-crud-d10d8-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`
      )
      .subscribe({
        next: (data) => {
          const task = data as ITask;

          // we have to update exact task. FindIndex returns the index of the task whose id is equal to the fetched id.
          const index = this.tasks.findIndex((task) => task.id === id);
          // If such task doesn't exist, index will be -1 so app will crash
          this.tasks[index] = {
            ...task,
            isEditMode: this.tasks[index].isEditMode,
          };

          this.refresh();
        },
      });
  }

  //POST REQUEST
  createTask(task: any) {
    //this.tasks.push(task);
    //this.refresh();
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
    console.log(id);
    console.log(this.getUrlTaskId(id));
    return this.http.delete(this.getUrlTaskId(id));
  }

  $Tasks() {
    return this.subject.asObservable();
  }
}