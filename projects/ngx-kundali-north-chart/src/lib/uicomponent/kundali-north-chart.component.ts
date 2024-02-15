import { Component, Input, OnInit } from '@angular/core';
import { chartdata } from '../models/chartdata';
import { bhav } from '../models/bhav';

@Component({
  selector: 'lib-kchart-north',
  standalone: true,
  imports: [],
  templateUrl: './kundali-north-chart.component.html',
  styleUrl: './kundali-north-chart.component.sass'
})
export class KundaliNorthChartComponent  implements OnInit {
  @Input() data!: chartdata;
  a = '';
  b = '';
  c = '';
  d = '';
  e = '';
  f = '';
  g = '';
  h = '';
  i = '';
  j = '';
  k = '';
  l = '';

  a1 = ''
  a2 = ''
  a3 = ''
  a4 = ''
  a5 = ''
  a6 = ''

  b1 = ''
  b2 = ''
  b3 = ''
  b4 = ''
  b5 = ''
  b6 = ''

  c1 = ''
  c2 = ''
  c3 = ''
  c4 = ''
  c5 = ''
  c6 = ''

  d1 = ''
  d2 = ''
  d3 = ''
  d4 = ''
  d5 = ''
  d6 = ''

  e1 = ''
  e2 = ''
  e3 = ''
  e4 = ''
  e5 = ''
  e6 = ''

  f1 = ''
  f2 = ''
  f3 = ''
  f4 = ''
  f5 = ''
  f6 = ''

  g1 = ''
  g2 = ''
  g3 = ''
  g4 = ''
  g5 = ''
  g6 = ''

  h1 = ''
  h2 = ''
  h3 = ''
  h4 = ''
  h5 = ''
  h6 = ''

  i1 = ''
  i2 = ''
  i3 = ''
  i4 = ''
  i5 = ''
  i6 = ''

  j1 = ''
  j2 = ''
  j3 = ''
  j4 = ''
  j5 = ''
  j6 = ''

  k1 = ''
  k2 = ''
  k3 = ''
  k4 = ''
  k5 = ''
  k6 = ''

  l1 = ''
  l2 = ''
  l3 = ''
  l4 = ''
  l5 = ''
  l6 = ''

  constructor() {
  }

  ngOnInit() {
    this.setBhavData(this.data);
  }

  setBhavData(data: chartdata) {
    if (data == undefined || this.data.houses == undefined) return;
    
    //console.log(JSON.stringify(data));
    // eslint-disable-next-line no-debugger
    //debugger;

    let i = 0;
    for (const item of this.data.houses) {
      i++;
      this.setBhav(item,i);
    }
  }

  setBhav(bhavData: bhav, varIndex: number) {
    let varName = ''

    switch (varIndex) {
      case 1:
        varName = 'a';
        break;
      case 2:
        varName = 'b';
        break;
      case 3:
        varName = 'c';
        break;
      case 4:
        varName = 'd';
        break;
      case 5:
        varName = 'e';
        break;
      case 6:
        varName = 'f';
        break;
      case 7:
        varName = 'g';
        break;
      case 8:
        varName = 'h';
        break;
      case 9:
        varName = 'i';
        break;

      case 10:
        varName = 'j';
        break;
      case 11:
        varName = 'k';
        break;
      case 12:
        varName = 'l';
        break;
    }

    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let space = ' ';

    eval('this.' + varName + ' = bhavData.rashi.toString()');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of bhavData.planets) {
      //chartdata[''] = 
      //this[varName + '3'] = '';
      //eval('this.' + varName + '3') += space + item;
      eval('this.' + varName + '3 += space + item');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of bhavData.bhavarudha) {
      eval('this.' + varName + '2 += space + item');
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of bhavData.nature) {
      eval('this.' + varName + '4 += space + item');
    }
  }

  getBhavArudha(item:number){
    return ' A'+ item;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  houseClick(changes:any){
    //debugger;

    if (changes.currentTarget.classList.contains('selected-path')) {
      changes.currentTarget.classList.remove('selected-path')
    }
    else {
      changes.currentTarget.classList.add('selected-path')
    }

    //console.log(changes);
  }
}
