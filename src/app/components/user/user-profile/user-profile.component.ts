import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from 'src/app/shared/models/IUser';

//import {NgbNav, NgbNavItem, NgbNavLink, NgbNavContent} from '@ng-bootstrap/ng-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  myprofileIcon = faUser;
  faUserEdit = faUserEdit;

  user!: IUser;
  private subscription?: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.$User().subscribe({
      next: (data) => {
        this.user = data;
      }
    });

    this.fetchUser();

  }

  fetchUser() {
    this.userService.getUser();
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}

