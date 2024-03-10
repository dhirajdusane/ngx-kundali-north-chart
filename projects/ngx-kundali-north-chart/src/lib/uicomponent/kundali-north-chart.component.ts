import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chartdata } from '../models/chartdata';
import { Bhava } from '../models/bhava';
import { RashiUICoOrdinates } from '../models/rashielement';
import { PlanetService } from '../services/planet/planet.service';
import { CalculationService } from '../services/displaycalculation/calculation.service';
import { Rashi } from '../models/rashi';

@Component({
  selector: 'lib-kchart-north',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kundali-north-chart.component.html',
  styleUrl: './kundali-north-chart.component.sass'
})
export class KundaliNorthChartComponent implements OnInit {
  @Input() data!: chartdata;

  bhavas: Bhava[] = [];
  firstBhava!: Bhava;

  planetService: PlanetService
  calculationService: CalculationService
  constructor(planetService: PlanetService, calculationService: CalculationService) {

    this.calculationService = calculationService;
    this.planetService = planetService;
  }

  ngOnInit() {

    if (this.data == undefined) return;

    this.constructLinkedList(this.data);
    this.setBhavaData(this.data);
  }

  constructLinkedList(chData: chartdata) {
    let previousBhava = this.firstBhava;

    for (let index = 0; index < 12; index++) {
      const bhav = new Bhava();
      bhav.index = index + 1;
      bhav.pathName = "#TH" + bhav.index;
      bhav.rashi = new Rashi();
      bhav.rashi.rashiNumber = (chData.lagna + index) > 12 ? (chData.lagna + index) - 12 : (chData.lagna + index);
      bhav.rashi.X = RashiUICoOrdinates[index].X;
      bhav.rashi.Y = RashiUICoOrdinates[index].Y;

      if (previousBhava == undefined) {
        this.firstBhava = bhav;
      }
      else {
        bhav.previous = previousBhava;
        previousBhava.next = bhav;
      }
      previousBhava = bhav;
    }
    previousBhava.next = this.firstBhava;
    this.firstBhava.previous = previousBhava;
    this.firstBhava.isLagna = true;
    this.firstBhava.items.push("La");
    console.log(this.firstBhava);
  }

  setBhavaData(chData: chartdata) {
    this.bhavas = [];
    let b = this.firstBhava;

    for (let index = 0; index < 12; index++) {
      this.bhavas.push(b);
      b = b.next;
    }

    for (let i = 0; i < this.data.planets.length; i++) {
      try {
        this.bhavas[this.data.planets[i] - 1].items.push(this.planetService.getPlanetText(i))
      } catch (error) {
        console.log(error);
      }
    }

     let arudhas = this.calculationService.getArudhaPadaArray(this.data.planets, this.data.lagna);
     console.log(arudhas);
    //Set adrudha padas of all houses
     for (let i = 0; i < 12; i++) {
      this.bhavas[arudhas[i] - 1].items.push(this.getBhavaArudha(i + 1));
     }
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
