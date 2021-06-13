import * as PIXI from 'pixi.js'
import { Angle } from '../math/Angle'
import { Band } from './Band'
import { Velocity } from '../math/Velocity'
import { Score } from '../Score'
import { Resources } from '../aliases'
import { assets } from '../assets'
import { Dimensions } from '../Dimensions'
import { Vector } from '../math/Vector'

export class Orb extends PIXI.AnimatedSprite {
    private resources: Resources
    private dimensions: Dimensions
    private radius: number
    private ticker: PIXI.Ticker
    velocity: Velocity
    private bands: Band[]
    private lastBounced: Band
    private score: Score
    popped: boolean

    constructor(x: number, y: number, velocity: Velocity, ticker: PIXI.Ticker, bands: Band[], score: Score, resources: Resources, dimensions: Dimensions) {
        super(assets.balloon.idle.map(it => resources[it].texture))
        this.resources = resources
        this.dimensions = dimensions

        this.radius = 20

        this.anchor.set(0.5, 0.5)

        this.ticker = ticker
        this.bands = bands
        this.ticker.add(this.onTick)

        this.x = x
        this.y = y
        this.lastBounced = null

        this.velocity = velocity
        this.score = score
        this.popped = false
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

        if (!this.popped && this.isOutOfBounds()) {
            this.pop()
        }
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

    pop = () => {
        if (!this.popped) {
            this.popped = true
            this.textures = assets.balloon.pop.map(it => this.resources[it].texture)
            this.onComplete = () => this.destroy()
            this.loop = false
            this.play()
        }
    }

    isCollidingWith = (band: Band): boolean => {
        return band.distanceFrom(this) <= this.radius
    }

    isOutOfBounds = () => {
        const w = this.dimensions.width
        const t = this.dimensions.tileWidth
        const r = this.radius
        return this.x < t - r || this.x - r > w - t || this.y < t - r || this.y - r > w - t
    }

    destroy() {
        this.ticker.remove(this.onTick)
        super.destroy()
    }
}
