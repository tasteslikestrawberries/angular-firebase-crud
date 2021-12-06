import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay } from 'rxjs/operators';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { UserService, IUser } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  faUserEdit = faUserEdit;

  @ViewChild('f') userForm?: NgForm;

  user!: IUser;
  private subscription?: Subscription;
  genders = ['Female', 'Male', 'Other'];
  submitted = false;
  isLoading = false;
  formStatus = 'Profile successfully updated.';
  deleted = false;
  deleteMessage = 'User successfully deleted.';

  constructor(private userService: UserService) {}

  onSubmit() {
    this.isLoading = true;
    //console.log(this.userForm);
    this.user = this.userForm?.value; //shortcut for this.user.firstName = this.userForm?.value.firstName etc. for all properties
    // TODO handle response (A)
    this.userService
      .updateUser(this.user)
      .pipe(delay(200))
      .subscribe({
        next: (responseData) => {
          this.submitted = true;
        },
        error: (error) => {
          console.warn(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnInit() {
    this.subscription = this.userService.$User().subscribe({
      next: (user) => {
        this.user = user;
      },
    });

    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUser();
  }

  deleteuser() {
    this.isLoading = true;
    this.userService
      .deleteUser()
      .pipe(delay(200))
      .subscribe({
        next: (data) => {
          console.log('Delete successful');
          this.deleted = true;
          this.userService.resetUser();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
