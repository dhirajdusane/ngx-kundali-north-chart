import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor() { }

  getPlanetText(num: number) {
    switch (num) {
      case 0:
        return 'Su';

      case 1:
        return 'Mo';

      case 2:
        return 'Me';

      case 3:
        return 'Ve';

      case 4:
        return 'Ma';

      case 5:
        return 'Ju';

      case 6:
        return 'Sa';

      case 7:
        return 'Ra';

      case 8:
        return 'Ke';
    }

    return '';
  }
}
