export class Vector {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    dot: (other: Vector) => number = (other) =>
        this.x * other.x + this.y * other.y
    
    magnitude: () => number = () =>
        Math.sqrt(this.x * this.x + this.y * this.y)
}