import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: IUser;
  private subject = new BehaviorSubject<IUser>(this.setInitialUser()); //avoid having an initial null object
  private url =
    'https://angular-crud-d10d8-default-rtdb.europe-west1.firebasedatabase.app/user/-MqG583661J479JGH4WL.json';

  constructor(private http: HttpClient) {}

  setInitialUser(): IUser {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      city: '',
      country: '',
    };
  }

  //GET REQUEST
  getUser() {
    this.http.get(this.url).subscribe({
      next: (data: any) => {
        const user: IUser = data; // data has a structure,check
        this.user = user;
        this.subject.next(this.user); // informs subscribers that new data has arrived and passes it to them
      },
    });
  }

  //POST REQUEST
  addUser(user: IUser) {
    return this.http.post(
      'https://angular-crud-d10d8-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      user
    );
  }

  //PUT REQUEST
  updateUser(user: IUser) {
    return this.http.put(this.url, user);
  }

  //DELETE REQUEST
  deleteUser() {
    return this.http.delete(this.url);
  }

  //reset after deleting profile
  resetUser() {
    this.user = this.setInitialUser();
    this.subject.next(this.user);
  }

  $User() {
    return this.subject.asObservable();
  }
}
