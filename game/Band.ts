import * as PIXI from 'pixi.js'
import { Angle } from './Angle';
import { Peg } from './Peg';
import { Vector } from './Vector';

export class Band extends PIXI.Sprite {
    private first: Peg
    private second: Peg
    
    constructor(first: Peg, second: Peg) {
        super()
        this.first = first
        this.second = second

        const graphics = new PIXI.Graphics()

        graphics.lineStyle({
            width: 2,
            color: 0x00ff00,
        })
        graphics.moveTo(first.x, first.y)
        graphics.lineTo(second.x, second.y)

        this.addChild(graphics)
    }

    distanceFrom: (o: PIXI.DisplayObject) => number = (o) => {
        const p1 = this.first
        const p2 = this.second
        const dx = p2.x - p1.x
        const dy = p2.y - p1.y

        return Math.abs(dx * (p1.y - o.y) - (p1.x - o.x) * dy) / Math.sqrt(dx * dx + dy * dy)
    }

    angleBetween: (v: Vector) => Angle = (v) => {
        const p = new Vector(this.second.x - this.first.x, this.second.y - this.first.y)
        return Angle.fromRadians(Math.acos(v.dot(p) / (v.magnitude() * p.magnitude())))
    }
}