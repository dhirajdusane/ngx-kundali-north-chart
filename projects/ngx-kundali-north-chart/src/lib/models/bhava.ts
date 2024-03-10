import { Rashi } from "./rashi";
import { House } from "./house";
//import { Occupant } from "./occupant";

// export class bhava{
//     planets: string[] = [];
//     rashi!: string;
//     bhavarudha:string[]= [];
//     nature:string[] = [];
// }

export class Occupant {
    txt!: string;
    isPlanet!: boolean;
    parentHouse!: Bhava;
    isArudha!: boolean;
}

export class Bhava {

    next!: Bhava;
    previous!: Bhava;

    constructor() {
    }

    items: Occupant[] = [];
    rashi!: Rashi;
    house!: House;
    isLagna!: boolean;
    pathName!: string;
    index!: number;

    addOccupant(name: string) {
        const o = new Occupant();
        o.txt = name;
        o.parentHouse = this;
        this.items.push(o);
    }

    getNext(i:number){
        let itemToReturn = this.previous;
        for (let j = 0;j < i;j++){
            itemToReturn = itemToReturn.next;
        }
        return itemToReturn;
    }
}



