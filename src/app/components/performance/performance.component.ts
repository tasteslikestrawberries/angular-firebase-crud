import { Component, OnInit } from '@angular/core';

//icons
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  performanceIcon=faChartLine

  constructor() { }

  ngOnInit(): void {
  }

}

