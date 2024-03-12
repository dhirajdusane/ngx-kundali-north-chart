import { OccupantType } from "./enums";

export class Occupant{
    txt!:string;
    occupantType!:OccupantType;
    bhavaIndex!:number;
    isActive!:boolean;

    constructor(name:string, oType:OccupantType,ix:number){
        this.txt = name;
        this.occupantType = oType;
        this.bhavaIndex = ix;
    }

    resetState(){
        this.isActive = false;
    }
}