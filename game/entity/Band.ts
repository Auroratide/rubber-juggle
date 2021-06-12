import * as PIXI from 'pixi.js'
import { Angle } from '../math/Angle';
import { Peg } from './Peg';
import { Vector } from '../math/Vector';

export class Band extends PIXI.Sprite {
    private first: Peg
    private second: Peg

    private graphics: PIXI.Graphics
    
    constructor(first: Peg, second: Peg) {
        super()
        this.first = first
        this.second = second

        this.graphics = new PIXI.Graphics()
        this.draw()
        this.addChild(this.graphics)
    }

    distanceFrom: (o: PIXI.DisplayObject) => number = (o) => {
        const p1 = this.first
        const p2 = this.second
        const dx = p2.x - p1.x
        const dy = p2.y - p1.y

        return Math.abs(dx * (p1.y - o.y) - (p1.x - o.x) * dy) / Math.sqrt(dx * dx + dy * dy)
    }

    angleBetween: (v: Vector) => Angle = (v) => {
        const p1 = new Vector(this.second.x - this.first.x, this.second.y - this.first.y)
        const a1 = Math.acos(v.dot(p1) / (v.magnitude() * p1.magnitude()))

        return Angle.fromRadians(Math.sign(v.x * p1.y - v.y * p1.x) * a1)
    }

    destroy() {
        this.first.removeBand(this)
        this.second.removeBand(this)
        super.destroy()
    }

    draw = () => {
        const g = this.graphics
        const f = this.first
        const s = this.second
        const perp = new Vector(s.x - f.x, s.y - f.y).perpendicular().normalized()

        g.lineStyle({
            width: 3,
            color: 0xc2a37c,
        })

        g.moveTo(f.x + 3 * perp.x, f.y + 3 * perp.y)
        g.lineTo(s.x + 3 * perp.x, s.y + 3 * perp.y)
        g.moveTo(f.x - 3 * perp.x, f.y - 3 * perp.y)
        g.lineTo(s.x - 3 * perp.x, s.y - 3 * perp.y)
    }
}