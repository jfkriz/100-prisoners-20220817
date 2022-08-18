export class Kata {
    private _numberOfPrisoners: number
    private _drawers: Array<number>;

    constructor(numberOfPrisoners: number) {
        this._numberOfPrisoners = numberOfPrisoners;

        this._drawers = this.createRandomNumberArray(numberOfPrisoners);
    }

    public get drawers() { return this._drawers; }

    public simulate(): Boolean {
        const success = this.createSequentialNumberArray(this._numberOfPrisoners).every(p => 
            this.countTriesToFindPrisonerNumber(p) <= (this._numberOfPrisoners / 2)
        );
        this._drawers = this.createRandomNumberArray(this._numberOfPrisoners);
        return success;
    }

    private createSequentialNumberArray(length: number): Array<number> {
        // This is a shorthand to create an array with the specified length, and populate it with
        // sequential numbers from 1 -> length
        return [...Array(length).keys()].map(n => n + 1);
    }

    private createRandomNumberArray(length: number): Array<number> {
        // Create a sequential array, then assign a random number to each entry as a sorting key,
        // then sort based on that random number.
        return this.createSequentialNumberArray(length).map(n => ({sort: Math.random(), value: n}))
            .sort((a, b) => a.sort - b.sort)
            .map(o => o.value);
    }

    private countTriesToFindPrisonerNumber(p: number): number {
        let nextDrawer = p;
        let count = 1;

        while(this._drawers[nextDrawer - 1] != p) {
            count++;
            nextDrawer = this._drawers[nextDrawer - 1];
        }

        return count;
    }
}
