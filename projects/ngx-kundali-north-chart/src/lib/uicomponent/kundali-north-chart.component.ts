import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
  styleUrls: ['./kundali-north-chart.component.sass', './slider.scss']

})
export class KundaliNorthChartComponent implements OnInit, OnChanges {

  @Input() data!: chartdata;

  grahaDrishtiMode: boolean = false;

  bhavas!: Bhava[];
  planets!: Occupant[];
  arudhas!: Occupant[];
  houses!: House[];

  houseActiveType = HouseActiveType;
  occupantType = OccupantType;

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

  ngOnChanges(changes: any) {
    this.constructLinkedList(this.data);
  }

  constructLinkedList(chData: chartdata) {

    this.bhavas = [];
    this.planets = [];
    this.arudhas = [];
    this.houses = [];

    for (let index = 0; index < 12; index++) {
      const rashi = new Rashi(RashiUICoOrdinates[index].X,
        RashiUICoOrdinates[index].Y, (chData.lagna + index) % 12);

      const house = new House(HouseSVGPaths[index].d);
      const bhava = new Bhava("#TH" + (index + 1), rashi, house, index);

      this.houses.push(house);
      this.bhavas.push(bhava);
    }

    const planet = 'B'.charCodeAt(0);
    for (let i = 0; i < this.data.planets.length; i++) {
      const o = this.bhavas[this.data.planets[i] - 1].addOccupant(
        String.fromCharCode(planet + i), OccupantType.Planet)
      this.planets.push(o);
    }

    let arudhaAscii = 'K'.charCodeAt(0);
    const arudhas = this.calculationService.getArudhaPadaArray(this.data.planets, this.data.lagna);
    console.log(arudhas);
    for (let i = 0; i < 12; i++,arudhaAscii++) {
      const o = this.bhavas[arudhas[i]-1].addOccupant(
        String.fromCharCode(arudhaAscii) , OccupantType.Arudha);
      this.arudhas.push(o);
    }

    let apada = 'a'.charCodeAt(0) - 1;
    for (let index = 0, j = arudhas[0]-1; index < 12; index++, j++, apada++) {
      if(index == 0) continue;
      this.bhavas[j%12].addOccupant(String.fromCharCode(apada), OccupantType.ArudhaPada); 
    }

    this.bhavas[0].addOccupant('A', OccupantType.Lagna);
  }

  houseClick(changes: any, b: Bhava) {
    for (let i = 0; i < 12; i++) {
      if (b.index == i) continue;
      this.houses[i].resetUserSelection();
    }

    b.house.Active[HouseActiveType.UserSelection] = !b.house.Active[HouseActiveType.UserSelection];
    this.setRashiDrishti(b);
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
      if (o.txt == this.planets[index].txt) continue;
      this.planets[index].isActive = false;
    }

    o.isActive = !o.isActive;

    if (o.isActive) {
      if (this.grahaDrishtiMode)
        this.addArgala(o);
      else
        this.grahaDrishti(o);
    }
  }

  grahaDrishti(o: Occupant) {

    if (o.txt == 'I' || o.txt == 'J' || o.txt == 'G')
      this.selectHouseBasedOnArray(o, [5, 7, 9], HouseActiveType.ArgalaSelection);
    else if (o.txt == 'H')
      this.selectHouseBasedOnArray(o, [3, 7, 10], HouseActiveType.ArgalaSelection);
    else if (o.txt == 'F')
      this.selectHouseBasedOnArray(o, [4, 7, 8], HouseActiveType.ArgalaSelection);
    else
      this.selectHouseBasedOnArray(o, [7], HouseActiveType.ArgalaSelection);
  }

  addArgala(o: Occupant) {

    if (o.txt == 'I' || o.txt == 'J') {
      this.selectHouseBasedOnArray(o, [2, 4, 5, 11], HouseActiveType.VirodhaArgalaSelection);
      this.selectHouseBasedOnArray(o, [3, 10, 12], HouseActiveType.ArgalaSelection);
    }
    else {
      this.selectHouseBasedOnArray(o, [2, 4, 5, 11], HouseActiveType.ArgalaSelection);
      this.selectHouseBasedOnArray(o, [3, 10, 12], HouseActiveType.VirodhaArgalaSelection);
    }
  }

  selectHouseBasedOnArray(o: Occupant, arr: number[], selection: HouseActiveType) {

    for (const i of arr) {
      const ix = ((o.bhavaIndex + i - 1) % 12);
      this.houses[ix].Active[selection] = true;

    }
  }

  onGrahaDrishtiMode(checked: boolean) {
    this.grahaDrishtiMode = checked;

    const getActiveOccupant = (element: Occupant) => element.isActive;

    const activeOccupant = this.planets.find(getActiveOccupant);

    if (activeOccupant != undefined)
      this.itemClick(null, activeOccupant as Occupant);
  }


  setRashiDrishti(b: Bhava) {
    for (let i = 0; i < 12; i++) {
      this.houses[i].Active[HouseActiveType.RashiDrishtiSelection] = false;
    }

    if (!b.house.Active[HouseActiveType.UserSelection])
      return;

    //const swabhav = ['c', 's', 'd',]
    //const chara = [1, 4, 7, 10];
    //const sthir = [2, 5, 8, 11]
    //const dual = [3,6,9,12]

    //dual
    if (b.rashi.rashiNumber % 3 == 0) {
      [3, 6, 9].forEach((x) => {
        this.bhavas[((b.index + x) % 12)].house.Active[HouseActiveType.RashiDrishtiSelection] = true;
      });
    }
    //Chara
    else if ((b.rashi.rashiNumber - 1) % 3 == 0) {
      [4, 7, 10].forEach((x) => {
        this.bhavas[((b.index + x) % 12)].house.Active[HouseActiveType.RashiDrishtiSelection] = true;
      });
    }
    else {
      [2, 5, 8].forEach((x) => {
        this.bhavas[((b.index + x) % 12)].house.Active[HouseActiveType.RashiDrishtiSelection] = true;
      });
    }
  }
}