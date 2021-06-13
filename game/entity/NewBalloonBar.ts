import * as PIXI from 'pixi.js'
import { OrbGenerator } from '../OrbGenerator'
import { assets } from '../assets'
import { Resources } from '../aliases'
import { Dimensions } from '../Dimensions'

export class NewBalloonBar extends PIXI.Container {
    private generator: OrbGenerator
    private ticker: PIXI.Ticker
    private dim: Dimensions

    private bar: PIXI.Graphics

    constructor(generator: OrbGenerator, resources: Resources, ticker: PIXI.Ticker, dim: Dimensions) {
        super()

        this.generator = generator
        this.ticker = ticker
        this.dim = dim

        const balloon = new PIXI.Sprite(resources[assets.balloon.idle[0]].texture)
        balloon.x = dim.tileWidth

        const back = new PIXI.Graphics()
        back.beginFill(0x000000, 0.667)
        back.drawRoundedRect(dim.tileWidth * 2, 30, dim.width - dim.tileWidth * 3.5, 20, 5)

        this.bar = new PIXI.Graphics()

        this.addChild(balloon)
        this.addChild(back)
        this.addChild(this.bar)

        this.ticker.add(this.showProgress)
    }

    private showProgress = () => {
        this.bar.clear()
        this.bar.beginFill(0x4164ff)
        this.bar.drawRoundedRect(this.dim.tileWidth * 2, 30, this.generator.progress() * (this.dim.width - this.dim.tileWidth * 3.5), 20, 5)
    }

    destroy() {
        this.ticker.remove(this.showProgress)
    }
}