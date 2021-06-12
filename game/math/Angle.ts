export class Angle {
    radians: number

    private constructor(radians: number) {
        this.radians = radians
    }

    get degrees(): number {
        return this.radians * 180 / Math.PI
    }

    opposite: () => Angle = () =>
        new Angle((this.radians + Math.PI) % (2 * Math.PI))

    static fromRadians(value: number): Angle {
        return new Angle(value)
    }

    static fromDegrees(value: number): Angle {
        return new Angle(value * Math.PI / 180)
    }
}