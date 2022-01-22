import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay } from 'rxjs/operators';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from 'src/app/shared/models/IUser';
import { formStatus, formMessage } from 'src/app/shared/models/FormStatusMsg';
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
  formStatus = formStatus;
  formMessage = formMessage;


  constructor(private userService: UserService) { }

  onSubmit() {
    this.formStatus.isLoading = true;
    //console.log(this.userForm);
    this.user = this.userForm?.value; //shortcut for this.user.firstName = this.userForm?.value.firstName etc. for all properties

    this.userService
      .updateUser(this.user)
      .pipe(delay(200))
      .subscribe({
        next: (data) => {
          this.formStatus.isUpdated = true;
        },
        error: (error) => {
          console.warn(error);
          this.formStatus.isError = true;
          this.formStatus.isLoading = false;
        },
        complete: () => {
          this.formStatus.isLoading = false;
        },
      });
  }

  ngOnInit() {
    this.subscription = this.userService.$User().subscribe({
      next: (data) => {
        this.user = data;
      },
    });

    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUser();
  }

  deleteUser() {
    this.formStatus.isLoading = true;
    this.userService
      .deleteUser()
      .pipe(delay(200))
      .subscribe({
        next: (data) => {
          this.formStatus.isDeleted = true;
          this.userService.resetUser();
        },
        error: (err) => {
          this.formStatus.isLoading = false;
          this.formStatus.isError = true;
        },
        complete: () => {
          this.formStatus.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
