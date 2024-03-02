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

  constructor(){
    //JSON.parse()
    this.staticChartData = jsonChartdata;// new chartdata();
}
}