import * as PIXI from 'pixi.js'
import { Angle } from '../math/Angle';
import { Peg } from './Peg';
import { Vector } from '../math/Vector';

export class Band extends PIXI.Container {
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
        // Distance to line segment
        // https://math.stackexchange.com/questions/330269/the-distance-from-a-point-to-a-line-segment
        const s1 = new Vector(this.first.x, this.first.y)
        const s2 = new Vector(this.second.x, this.second.y)
        const p = new Vector(o.x, o.y)
        const s = (t: number) => new Vector(s1.x + t * (s2.x - s1.x), s1.y + t * (s2.y - s1.y))

        const m = s2.minus(s1).magnitude()

        const th = (p.minus(s1).dot(s2.minus(s1))) / (m * m)
        const ts = Math.min(Math.max(th, 0), 1)

        return s(ts).minus(p).magnitude()
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
            width: 6,
            color: 0xc2a37c,
        })

        g.moveTo(f.x + 6 * perp.x, f.y + 6 * perp.y)
        g.lineTo(s.x + 6 * perp.x, s.y + 6 * perp.y)
        g.moveTo(f.x - 6 * perp.x, f.y - 6 * perp.y)
        g.lineTo(s.x - 6 * perp.x, s.y - 6 * perp.y)
    }
}