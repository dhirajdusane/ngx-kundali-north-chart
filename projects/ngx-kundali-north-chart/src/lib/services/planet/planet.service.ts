import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor() { }

  getPlanetText(num: number) {
    switch (num) {
      case 0:
        return 'B';

      case 1:
        return 'C';

      case 2:
        return 'D';

      case 3:
        return 'E';

      case 4:
        return 'F';

      case 5:
        return 'G';

      case 6:
        return 'H';

      case 7:
        return 'I';

      case 8:
        return 'J';
    }

    return '';
  }
}
