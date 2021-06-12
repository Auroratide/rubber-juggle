import * as PIXI from 'pixi.js'
import { Angle } from './Angle'
import { Velocity } from './Velocity'

export class Orb extends PIXI.Sprite {
    private ticker: PIXI.Ticker
    private velocity: Velocity

    constructor(ticker: PIXI.Ticker) {
        super()

        this.ticker = ticker
        this.ticker.add(this.onTick)

        const graphics = new PIXI.Graphics()
        graphics.beginFill(0xffffff)
        graphics.drawCircle(0, 0, 10)

        this.addChild(graphics)
        this.x = 0
        this.y = 0

        this.velocity = new Velocity(0.5, 0.5)
    }

    onTick = () => {
        this.velocity.apply(this)
    }

    bounce = (angle: Angle) => {
        const cos = Math.cos(2 * angle.radians)
        const sin = Math.sin(2 * angle.radians)
        this.velocity = new Velocity(
            cos * this.velocity.x - sin * this.velocity.y,
            sin * this.velocity.x + cos * this.velocity.y,
        )
    }

    destroy() {
        this.ticker.remove(this.onTick)
        super.destroy()
    }
}
