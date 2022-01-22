import { Component, OnInit } from '@angular/core';

import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownArrow = faCaretDown;
  hamburger = faBars;
  
  constructor() {}

  ngOnInit(): void {}
}
