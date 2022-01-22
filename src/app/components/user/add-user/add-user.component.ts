import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { formStatus, formMessage } from 'src/app/shared/models/FormStatusMsg';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(private userService: UserService) { }

  onSubmit() {
    this.formStatus.isLoading = true;
    this.user = this.userForm?.value; //shortcut for this.user.firstName = this.userForm?.value.firstName etc. for all properties

    this.userService
      .addUser(this.user)
      .pipe(delay(200))
      .subscribe({
        next: (data) => {
          this.formStatus.isAdded = true;
        },
        error: (error) => {
          this.formStatus.isLoading = false;
          this.formStatus.isError = true;
        },
        complete: () => {
          this.formStatus.isLoading = false;
        },
      });

    this.userForm?.reset(); //resets the form and its properties and state (like touched,dirty etc.)
  }

  ngOnInit(): void { }
}
