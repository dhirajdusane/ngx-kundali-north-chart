import { HouseActiveType } from "./enums";

export class House {
    d!: string;
    Active:boolean[] = [];

    constructor(dString: string) {
        this.d = dString;
        for (let index = 0; index < Object.keys(HouseActiveType).length; index++) {
            this.Active.push(false);            
        }
    }

    resetState() {
        this.Active[HouseActiveType.ArgalaSelection] = false;
        this.Active[HouseActiveType.VirodhaArgalaSelection] = false;
    }

    resetUserSelection() {
        this.Active[HouseActiveType.UserSelection] = false;
    }

    getState(){
        return false;
    }
}