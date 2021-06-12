export class Angle {
    radians: number

    private constructor(radians: number) {
        this.radians = radians
    }

    static fromRadians(value: number): Angle {
        return new Angle(value)
    }

    static fromDegrees(value: number): Angle {
        return new Angle(value * Math.PI / 180)
    }
}