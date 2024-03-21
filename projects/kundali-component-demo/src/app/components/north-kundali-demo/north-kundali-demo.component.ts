import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { KundaliNorthChartComponent, chartdata } from 'ngx-kundali-north-chart';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-north-kundali-demo',
  standalone: true,
  imports: [MatTabsModule,MatCardModule,KundaliNorthChartComponent,AboutComponent,FormsModule],
  templateUrl: './north-kundali-demo.component.html',
  styleUrl: './north-kundali-demo.component.sass'
})
export class NorthKundaliDemoComponent implements OnChanges,OnInit {
  staticChartData!:chartdata;
  jsonData!:string;

  constructor(){
    //this.jsonData =`{ "planets": [1,1,12,12,9,10,2,3,9], "lagna": 9 }`;//Demo
    this.jsonData =`{ "planets": [1,11,8,12,9,1,4,12,6], "lagna": 6 }`;//D-10
    //this.jsonData =`{ "planets": [12,12,11,12,8,1,10,7,7], "lagna": 7 }`;//D-2
    //this.jsonData =`{ "planets": [12,12,12,12,10,1,11,4,10], "lagna": 10 }`;//D-1
    //this.jsonData =`{ "planets": [3,12,6,11,9,1,11,6,12], "lagna": 4 }`;//D-4-Tithi-Pravesh
    //this.jsonData =`{ "planets": [12,9,6,12,10,1,5,10,4], "lagna": 7 }`;//D-4
    //this.jsonData =`{ "planets": [11,9,3,11,5,10,7,1,7], "lagna": 8 }`;//D-10-Tithi-Pravesh

    
    const a = new dictionary();
    a['a'] = 4;
    a['b'] = 5;

    console.log(a);
    console.log(a['b']);
    console.log(a['c']);
    // ['a',2,'d',4];
}
  ngOnInit(): void {
    this.staticChartData = JSON.parse(this.jsonData) as chartdata;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.staticChartData = JSON.parse(this.jsonData) as chartdata; 
  }

ApplyJson(){
  console.log(this.jsonData);
  this.staticChartData = JSON.parse(this.jsonData) as chartdata;
}
}

class dictionary{
  [abc:string]: number;
}