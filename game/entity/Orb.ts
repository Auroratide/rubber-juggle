import * as PIXI from 'pixi.js'
import { Angle } from '../math/Angle'
import { Band } from './Band'
import { Velocity } from '../math/Velocity'
import { Score } from '../Score'

export class Orb extends PIXI.Sprite {
    private radius: number
    private ticker: PIXI.Ticker
    velocity: Velocity
    private bands: Band[]
    private lastBounced: Band
    private score: Score

    constructor(x: number, y: number, velocity: Velocity, ticker: PIXI.Ticker, bands: Band[], score: Score) {
        super()

        this.radius = 20

        this.ticker = ticker
        this.bands = bands
        this.ticker.add(this.onTick)

        const graphics = new PIXI.Graphics()
        graphics.beginFill(0x008800)
        graphics.drawCircle(0, 0, this.radius)

        this.addChild(graphics)
        this.x = x
        this.y = y
        this.lastBounced = null

        this.velocity = velocity
        this.score = score
    }

    onTick = () => {
        this.velocity.apply(this)

        let bouncedAlready = false
        this.bands.forEach(band => {
            if (!bouncedAlready && this.lastBounced !== band && this.isCollidingWith(band)) {
                this.score.add(10 * this.velocity.magnitude())
                this.bounce(band.angleBetween(this.velocity))
                this.lastBounced = band
                bouncedAlready = true
            }
        })
    }

    bounce = (angle: Angle) => {
        const cos = Math.cos(2 * angle.radians)
        const sin = Math.sin(2 * angle.radians)
        this.velocity = new Velocity(
            cos * this.velocity.x - sin * this.velocity.y,
            sin * this.velocity.x + cos * this.velocity.y,
        )

        if (this.velocity.magnitude() <= 5)
            this.velocity = this.velocity.increaseBy(0.05)
    }

    isCollidingWith = (band: Band): boolean => {
        return band.distanceFrom(this) <= this.radius
    }

    destroy() {
        this.ticker.remove(this.onTick)
        super.destroy()
    }
}
