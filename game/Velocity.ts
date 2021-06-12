import * as PIXI from 'pixi.js'
import { Vector } from './Vector'

export class Velocity extends Vector {
    constructor(x: number, y: number) {
        super(x, y)
    }

    apply = (obj: PIXI.DisplayObject) => {
        obj.position.set(obj.x + this.x, obj.y + this.y)
    }
}