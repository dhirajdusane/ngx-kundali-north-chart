import { Rashi } from "./rashi";

// export class bhava{
//     planets: string[] = [];
//     rashi!: string;
//     bhavarudha:string[]= [];
//     nature:string[] = [];
// }

export class Bhava{

    next!:Bhava;
    previous!:Bhava;

    constructor(){        
    }

    items: string[] = [];    
    rashi!: Rashi;
    isLagna!:boolean;
    pathName!:string;
    index!:number;


}



