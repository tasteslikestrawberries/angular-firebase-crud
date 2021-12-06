import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { 
      data: [5, 10, 8, 11, 13, 4, 3, 8, 10, 12, 15, 10],
      label: 'Tasks', 
      backgroundColor: ["#1eb7e6", "#00ffea", "#11cc00", "#ffc000", "#fff900", "#ff8800", "#ff00bb", "#e90101", "#c90076", "#bd30ff", "#5cb2ff", "#0055c9"],
      hoverBackgroundColor: '#1eb7e6'
    }
  ];

}
