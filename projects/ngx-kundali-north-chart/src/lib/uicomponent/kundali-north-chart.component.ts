import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chartdata } from '../models/chartdata';
import { Bhava, Occupant } from '../models/bhava';
import { RashiUICoOrdinates } from '../models/rashielement';
import { PlanetService } from '../services/planet/planet.service';
import { CalculationService } from '../services/displaycalculation/calculation.service';
import { Rashi } from '../models/rashi';
import { HouseSVGPaths } from '../models/houseelement';
import { House } from '../models/house';

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

      bhav.house = new House();
      bhav.house.d = HouseSVGPaths[index].d;

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
    this.firstBhava.addOccupant("La");
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
        this.bhavas[this.data.planets[i] - 1].addOccupant(this.planetService.getPlanetText(i))
      } catch (error) {
        console.log(error);
      }
    }

    let arudhas = this.calculationService.getArudhaPadaArray(this.data.planets, this.data.lagna);
    console.log(arudhas);
    //Set adrudha padas of all houses
    for (let i = 0; i < 12; i++) {
      this.bhavas[arudhas[i] - 1].addOccupant(this.getBhavaArudha(i + 1));
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
  houseClick(changes: any, b: Bhava) {
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

  previousItem: any = undefined;

  itemClick(changes: any, o: Occupant) {
    for (let i = 0; i < 12; i++) {
      this.bhavas[i].house.isActive1 = false;
      this.bhavas[i].house.isActive2 = false;
    }
    //debugger;
    if (changes.currentTarget.classList.contains('a-item-selected')) {
      changes.currentTarget.classList.remove('a-item-selected')
    }
    else {
      if (this.previousItem != undefined)
        this.previousItem.classList.remove('a-item-selected');

      changes.currentTarget.classList.add('a-item-selected')
      this.previousItem = changes.currentTarget;
      this.addArgala(o);
    }
    //console.log(changes);
  }

  addArgala(o: Occupant) {
    if (o.txt == 'Ke' || o.txt == 'Ra') {
      for (const i of [2, 4, 5, 11]) {
        o.parentHouse.getNext(i).house.isActive2 = true;
      }
      for (const i of [3, 10, 12]) {
        o.parentHouse.getNext(i).house.isActive1 = true;
      }
    }
    else if(!o.txt.startsWith('A')) {
      for (const i of [2, 4, 5, 11]) {
        o.parentHouse.getNext(i).house.isActive1 = true;
      }
      for (const i of [3, 10, 12]) {
        o.parentHouse.getNext(i).house.isActive2 = true;
      }
    }
  }
}

