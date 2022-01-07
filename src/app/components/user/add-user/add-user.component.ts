import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay } from 'rxjs/operators';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

export const formStatus = {
  isLoading: false,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  isError: false
}

export const formMessage = {
  addedMsg: 'User successfully added.',
  updatedMsg: 'Profile successfully updated.',
  deletedMsg: 'Profile successfully deleted.',
  errorMsg: 'Sorry, an error occured.'
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  faUserPlus = faUserPlus;

  @ViewChild('f') userForm?: NgForm;

  genders = ['Female', 'Male', 'Other'];
  user = this.userService.setInitialUser();
  formStatus = formStatus;
  formMessage = formMessage;


  constructor(private userService: UserService) {}

  onSubmit() {
    this.formStatus.isLoading = true;
    //console.log(this.userForm);
    this.user = this.userForm?.value; //shortcut for this.user.firstName = this.userForm?.value.firstName etc. for all properties

    // TODO handle response (A)
    this.userService
      .createUser(this.user)
      .pipe(delay(200))
      .subscribe({
        next: (data) => {
          this.formStatus.isAdded = true;
        },
        error: (error) => {
          console.warn(error);
          this.formStatus.isLoading = false;
          this.formStatus.isError = true;
        },
        complete: () => {
          this.formStatus.isLoading = false;
        },
      });

    this.userForm?.reset(); //resets the form and its properties and state (like touched,dirty etc.)
  }

  ngOnInit(): void {}
}
