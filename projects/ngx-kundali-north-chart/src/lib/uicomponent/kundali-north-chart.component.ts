import { Component, Input, OnInit } from '@angular/core';
import { chartdata } from '../models/chartdata';
//import { bhava } from '../models/bhava';
import { PlanetService } from '../services/planet/planet.service';
import { CalculationService } from '../services/displaycalculation/calculation.service';

@Component({
  selector: 'lib-kchart-north',
  standalone: true,
  imports: [],
  templateUrl: './kundali-north-chart.component.html',
  styleUrl: './kundali-north-chart.component.sass'
})
export class KundaliNorthChartComponent implements OnInit {
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

  planetService: PlanetService
  calculationService: CalculationService
  constructor(planetService: PlanetService, calculationService: CalculationService) {
    this.calculationService = calculationService;
    this.planetService = planetService;
  }

  ngOnInit() {
    this.setBhavaData(this.data);
  }

  setBhavaData(data: chartdata) {
    if (data == undefined) return;

    //console.log(JSON.stringify(data));
    // eslint-disable-next-line no-debugger
    //debugger;
    const space = ' ';
    this.a4 += space + 'Lagna';

    for (let i = 0; i < this.data.planets.length; i++) {
      try {
        const varName = this.getBhavaIndex(this.data.planets[i] - 1);
        eval('this.' + varName + '3 += space + this.planetService.getPlanetText(i)');
      } catch (error) {
        console.log(error);
      }
    }

    const lords = this.calculationService.getBhavaRashiArray(this.data.lagna);
    for (let i = 0; i < 12; i++) {
      const varName = this.getBhavaIndex(i);
      eval('this.' + varName + ' += space + lords[i]');
    }

    let arudhas = this.calculationService.getArudhaPadaArray(this.data.planets, this.data.lagna);
    console.log(arudhas);

    //Set adrudha padas of all houses
    for (let i = 0; i < 12; i++) {
      const varName = this.getBhavaIndex(arudhas[i] - 1);
      const txt = this.getBhavaArudha(i + 1);
      eval('this.' + varName + '2 += space + txt');
    }
  }

  getBhavaIndex(varIndex: number) {
    let varName = ''

    switch (varIndex) {
      case 0:
        varName = 'a';
        break;
      case 1:
        varName = 'b';
        break;
      case 2:
        varName = 'c';
        break;
      case 3:
        varName = 'd';
        break;
      case 4:
        varName = 'e';
        break;
      case 5:
        varName = 'f';
        break;
      case 6:
        varName = 'g';
        break;
      case 7:
        varName = 'h';
        break;
      case 8:
        varName = 'i';
        break;

      case 9:
        varName = 'j';
        break;
      case 10:
        varName = 'k';
        break;
      case 11:
        varName = 'l';
        break;
    }
    return varName;
  }

  getBhavaArudha(item: number) {
    if (item == 1)
      return ' AL';
    else
      return ' A' + item;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previousTarget: any = undefined;
  houseClick(changes: any) {
    //debugger;

    if (changes.currentTarget.classList.contains('selected-path')) {
      changes.currentTarget.classList.remove('selected-path')
    }
    else {
      if (this.previousTarget != undefined)
        this.previousTarget.classList.remove('selected-path');

      changes.currentTarget.classList.add('selected-path')
      this.previousTarget = changes.currentTarget;
    }

    //console.log(changes);
  }
}
