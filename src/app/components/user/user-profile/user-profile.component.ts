import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, IUser } from 'src/app/services/user.service';

//import {NgbNav, NgbNavItem, NgbNavLink, NgbNavContent} from '@ng-bootstrap/ng-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  active = 1;

  /*
  ngbNav = NgbNav;
  ngbNavItem = NgbNavItem;
  ngbNavLink = NgbNavLink;
  ngbNavContent = NgbNavContent;
  */
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

