import * as PIXI from 'pixi.js'

export class Velocity {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    apply = (obj: PIXI.DisplayObject) => {
        obj.position.set(obj.x + this.x, obj.y + this.y)
    }
}