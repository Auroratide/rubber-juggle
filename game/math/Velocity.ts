import * as PIXI from 'pixi.js'
import { Vector } from './Vector'

export class Velocity extends Vector {
    constructor(x: number, y: number) {
        super(x, y)
    }

    increaseBy: (value: number) => Velocity = (value) => {
        const m = this.magnitude()
        const v = this.normalized().scaleBy(m + value)
        return new Velocity(v.x, v.y)
    }

    apply = (obj: PIXI.DisplayObject) => {
        obj.position.set(obj.x + this.x, obj.y + this.y)
    }
}