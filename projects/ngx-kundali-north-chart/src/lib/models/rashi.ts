export class Rashi {
    X!: number;
    Y!: number;
    rashiNumber!: number;
    bhavIndex!: number;

    constructor(x: number, y: number, rashi: number) {
        this.X = x;
        this.Y = y;
        this.rashiNumber = rashi == 0 ? 12 : rashi;
    }
}