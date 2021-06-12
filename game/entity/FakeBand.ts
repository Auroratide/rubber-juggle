import * as PIXI from 'pixi.js'
import { Peg } from './Peg';
import { Vector } from '../math/Vector';

export class FakeBand extends PIXI.Sprite {
    private peg: Peg
    private to: Vector

    private graphics: PIXI.Graphics
    
    constructor(peg: Peg) {
        super()
        this.peg = peg
        this.to = new Vector(peg.x, peg.y)

        this.graphics = new PIXI.Graphics()
        this.addChild(this.graphics)

        this.moveTo(this.peg.x, this.peg.y)

        this.alpha = 0.5
    }

    moveTo: (x: number, y: number) => void = (x, y) => {
        this.to = new Vector(x, y)
        this.draw()
    }

    draw = () => {
        const g = this.graphics
        const f = this.peg
        const s = this.to
        const perp = new Vector(s.x - f.x, s.y - f.y).perpendicular().normalized()

        g.clear()

        g.lineStyle({
            width: 6,
            color: 0xc2a37c,
        })

        g.moveTo(f.x + 6 * perp.x, f.y + 6 * perp.y)
        g.lineTo(s.x + 18 * perp.x, s.y + 18 * perp.y)
        g.arc(s.x, s.y, 18, perp.angleBetween(new Vector(1, 0)).radians, perp.angleBetween(new Vector(1, 0)).opposite().radians, true)
        g.moveTo(f.x - 6 * perp.x, f.y - 6 * perp.y)
        g.lineTo(s.x - 18 * perp.x, s.y - 18 * perp.y)
    }
}