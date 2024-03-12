import { Rashi } from "./rashi";
import { House } from "./house";
import { Occupant } from "./occupant";
import { OccupantType } from "./enums";

export class Bhava {
    constructor(pathString:string, r:Rashi, h:House,i:number) {
        this.pathName = pathString;
        this.rashi = r;
        this.house = h;
        this.index = i;
    }

    items: Occupant[] = [];
    rashi!: Rashi;
    house!: House;
    pathName!: string;
    index!:number;

    addOccupant(name: string, oType:OccupantType) {
        const o = new Occupant(name,oType,this.index);
        this.items.push(o);
        return o;
    }
}
