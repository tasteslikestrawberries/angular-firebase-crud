import { Component, OnInit } from '@angular/core';

import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
//import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownArrow = faCaretDown;
  hamburger = faBars;
  /*
  ngbDropdown = NgbDropdown;
  ngbDropdownMenu = NgbDropdownMenu;
  ngbDropdownToggle = NgbDropdownToggle;
  ngbDropdownItem = NgbDropdownItem;
  */

  constructor() {}

  ngOnInit(): void {}
}
