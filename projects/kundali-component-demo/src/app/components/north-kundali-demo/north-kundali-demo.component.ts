import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { KundaliNorthChartComponent, chartdata } from 'ngx-kundali-north-chart';
import * as jsonChartdata from './dhiruBhaiV2.json'
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-north-kundali-demo',
  standalone: true,
  imports: [MatTabsModule,MatCardModule,KundaliNorthChartComponent,AboutComponent],
  templateUrl: './north-kundali-demo.component.html',
  styleUrl: './north-kundali-demo.component.sass'
})
export class NorthKundaliDemoComponent {
  staticChartData!:chartdata;
  jsonData!:string;

  constructor(){
    //JSON.parse()
    //this.staticChartData = `{
    //  "planets": [1,1,12,12,9,10,2,3,9],
    //    "lagna": 9
    //}` as chartdata ; //jsonChartdata;// new chartdata();

    //this.jsonData =`{ "planets": [1,1,12,12,9,10,2,3,9], "lagna": 9 }`;
    this.jsonData =`{ "planets": [1,11,8,12,9,1,4,12,6], "lagna": 6 }`;

    this.staticChartData = JSON.parse(this.jsonData) as chartdata;
}

ApplyJson(){
  console.log(this.jsonData);
  this.staticChartData = JSON.parse(this.jsonData) as chartdata;
}
}