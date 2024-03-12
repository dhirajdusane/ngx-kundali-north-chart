import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { chartdata } from '../models/chartdata';

import { Bhava } from '../models/bhava';
import { Rashi } from '../models/rashi';
import { House } from '../models/house';
import { Occupant } from '../models/occupant';

import { PlanetService } from '../services/planet/planet.service';
import { CalculationService } from '../services/displaycalculation/calculation.service';

import { RashiUICoOrdinates, HouseSVGPaths } from '../models/uiElements';
import { HouseActiveType, OccupantType } from '../models/enums';

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
  planets: Occupant[] = [];
  arudhas: Occupant[] = [];
  houses: House[] = [];

  houseActiveType = HouseActiveType;
  planetService: PlanetService
  calculationService: CalculationService
  constructor(planetService: PlanetService, calculationService: CalculationService) {

    this.calculationService = calculationService;
    this.planetService = planetService;
  }

  ngOnInit() {

    if (this.data == undefined) return;

    this.constructLinkedList(this.data);
  }

  constructLinkedList(chData: chartdata) {

    for (let index = 0; index < 12; index++) {
      const rashi = new Rashi(RashiUICoOrdinates[index].X,
        RashiUICoOrdinates[index].Y, (chData.lagna + index) % 12);

      const house = new House(HouseSVGPaths[index].d);
      const bhava = new Bhava("#TH" + (index + 1), rashi, house, index);

      this.houses.push(house);
      this.bhavas.push(bhava);
    }

    for (let i = 0; i < this.data.planets.length; i++) {
      const o = this.bhavas[this.data.planets[i] - 1].addOccupant(
        this.planetService.getPlanetText(i), OccupantType.Planet)
      this.planets.push(o);
    }

    const arudhas = this.calculationService.getArudhaPadaArray(this.data.planets, this.data.lagna);
    for (let i = 0; i < 12; i++) {
      const o = this.bhavas[arudhas[i] - 1].addOccupant(
        this.getBhavaArudha(i + 1), OccupantType.Arudha);
      this.arudhas.push(o);
    }

    this.bhavas[0].addOccupant('Lagna',  OccupantType.Lagna );
  }

  getBhavaArudha(item: number) {
    if (item == 1)
      return ' AL ';
    else
      return ' A' + item + ' ';
  }

  houseClick(changes: any, b: Bhava) {
    for (let i = 0; i < 12; i++) {
      if (b.index == i) continue;
      this.houses[i].resetUserSelection();
    }

    b.house.Active[HouseActiveType.UserSelection] = !b.house.Active[HouseActiveType.UserSelection];
  }

  resetHouseState(skip: number = -1) {
    for (let i = 0; i < 12; i++) {
      if (i == skip) continue;
      this.houses[i].resetState()
    }
  }

  itemClick(changes: any, o: Occupant) {

    if (o.occupantType != OccupantType.Planet) return;

    this.resetHouseState();

    for (let index = 0; index < this.planets.length; index++) {
      if(o.txt == this.planets[index].txt) continue;
      this.planets[index].isActive = false;
    }

    o.isActive = !o.isActive;
    
    if(o.isActive)
      this.addArgala(o);
  }

  addArgala(o: Occupant) {

    const func = (arr: number[], selection: HouseActiveType) => {
      for (const i of arr) {
        const ix = ((o.bhavaIndex + i - 1) % 12);
        this.houses[ix].Active[selection] = true;
      }
    }

    if (o.txt == 'Ke' || o.txt == 'Ra') {
      func([2, 4, 5, 11], HouseActiveType.VirodhaArgalaSelection);
      func([3, 10, 12], HouseActiveType.ArgalaSelection);
    }
    else {
      func([2, 4, 5, 11], HouseActiveType.ArgalaSelection);
      func([3, 10, 12], HouseActiveType.VirodhaArgalaSelection);
    }
  }
}

