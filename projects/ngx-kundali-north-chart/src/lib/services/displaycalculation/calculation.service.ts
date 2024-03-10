import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  normalizeTo12(index: number) {
    if (index > 12) return index - 12;
    else if(index < 0) return index * -1;
    else return index;
  }

  // getBhavaRashiArray(lagna: number) {
  //   const bavaRashis: number[] = [];
  //   for (let i = 0; i < 12; i++) {
  //     bavaRashis.push(this.normalizeTo12(i + lagna))
  //   }
  //   return bavaRashis;
  // }

  getArudhaPada(houseNumber: number, planetHouseNumber: number) {
    if (planetHouseNumber == houseNumber ||
       this.normalizeTo12(houseNumber + 6) == planetHouseNumber)
      return this.normalizeTo12(planetHouseNumber + 9);

    console.log('houeNumber : '+ houseNumber + ' planetHouse :' + planetHouseNumber);

    return this.normalizeTo12(((planetHouseNumber - houseNumber) + planetHouseNumber))
  }

  getArudhaPadaArray(planets:number[], lagna:number){
    const arudhas:number[] = [];
      for (let i = 0; i < 12; i++) {
        const index = this.getRashiLordIndex(i + lagna);
        arudhas.push(this.getArudhaPada(i + 1, planets[index]));
      }
      return arudhas;
    }

  getRashiLordIndex(rashi: number) {
    switch (this.normalizeTo12(rashi)) {
      case 1:
      case 8:
        return 4;

      case 2:
      case 7:
        return 3;

      case 3:
      case 6:
        return 2;

      case 4:
        return 1;

      case 5:
        return 0;

      case 9:
      case 12:
        return 5;

      case 10:
      case 11:
        return 6;
    }

    return 0;
  }
}
