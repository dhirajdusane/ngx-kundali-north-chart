import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  normalizeTo12(index: number) {
    if (index > 12) return index - 12;
    else if (index < 0) return index * -1;
    else return index;
  }

  // getBhavaRashiArray(lagna: number) {
  //   const bavaRashis: number[] = [];
  //   for (let i = 0; i < 12; i++) {
  //     bavaRashis.push(this.normalizeTo12(i + lagna))
  //   }
  //   return bavaRashis;
  // }

  //getArudhaPada(houseNumber: number, planetHouseNumber: number) {
  //  if (planetHouseNumber == houseNumber ||
  //     this.normalizeTo12(houseNumber + 6) == planetHouseNumber)
  //    return this.normalizeTo12(planetHouseNumber + 9);
  //
  //  console.log('houeNumber : '+ houseNumber + ' planetHouse :' + planetHouseNumber);
  //
  //  return this.normalizeTo12(((planetHouseNumber - houseNumber) + planetHouseNumber))
  //}

  getArudhaPadaArray(planets: number[], lagna: number) {
    const arudhas: number[] = [];
    for (let houseIndex = 0; houseIndex < 12; houseIndex++) {
      const rashi = ((houseIndex + (lagna - 1)) % 12) + 1;
      const rashiLordIndex = this.getRashiLordIndex((houseIndex + (lagna - 1)) % 12);
      const rashiLordPlanetIndex = planets[this.getRashiLordIndex((houseIndex + (lagna - 1)) % 12)];
      let distance = ((rashiLordPlanetIndex - 1) - houseIndex);

      if(distance == 0 || distance == 6)
        distance = 9;

      if(distance == -6)
        distance = -9;

      const arudha = (rashiLordPlanetIndex + distance) % 12;
      arudhas.push((arudha < 0 ? arudha + 12 : arudha));
      //console.log('a: ' + rashi + ' b: ' + rashiLordIndex + ' c: ' + rashiLordPlanetIndex);
      //console.log('distance ' + distance);
      //console.log('house ' + houseIndex + ' distance ' + distance + ' arudha: ' + (arudha < 0 ? arudha + 12 : arudha));
    }
    //console.log(arudhas);
    return arudhas;
  }


  getRashiLordIndex(rashi: number) {
    switch (this.normalizeTo12(rashi)) {
      case 0:
      case 7:
        return 4;

      case 1:
      case 6:
        return 3;

      case 2:
      case 5:
        return 2;

      case 3:
        return 1;

      case 4:
        return 0;

      case 8:
      case 11:
        return 5;

      case 9:
      case 10:
        return 6;
    }

    return 0;
  }
}
