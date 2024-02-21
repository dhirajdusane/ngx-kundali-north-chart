import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  normalizeTo12(index: number) {
    if (index > 12) return index - 12;
    else return index;
  }

  getBhavesh(lagna: number) {
    const bavLords: number[] = [];
    for (let i = 0; i < 12; i++) {
      bavLords.push(this.normalizeTo12(i + lagna + 1))
    }
    return bavLords;
  }


  getArudhaPada(houseNumber: number, planetIndex: number) {
    return this.normalizeTo12(((planetIndex - houseNumber) + planetIndex))
  }

  getArudhaPadaLords(lagnaRashiNumber: number, planets: number[]) {
    const arudPadas: number[] = [];
    for (let i = 0; i < 12; i++) {
      const index = this.getRashiLordIndex(i + lagnaRashiNumber);
      arudPadas.push(this.getArudhaPada(i + 1, planets[index]));
    }

    return arudPadas;
  }

  getRashiLordIndex(rashi: number) {
    switch (rashi) {
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
