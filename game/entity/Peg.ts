import * as PIXI from 'pixi.js'
import { Pegboard } from './Pegboard'
import { Band } from './Band'

export class Peg extends PIXI.Sprite {
    private ticker: PIXI.Ticker
    private board: Pegboard
    bands: Band[]

    private blinkDirection: number = -0.05

    constructor(x: number, y: number, board: Pegboard, ticker: PIXI.Ticker) {
        super()

        this.x = x
        this.y = y
        this.board = board
        this.bands = []

        const graphics = new PIXI.Graphics()
        graphics.beginFill(0xff0000)
        graphics.drawCircle(0, 0, 20)

        this.addChild(graphics)

        this.interactive = true
        this.on('mousedown', this.onPress)
        this.on('mouseup', this.onRelease)

        this.ticker = ticker
    }

    onPress = () => {
        console.log('Pressed a peg')
        this.board.prepareBand(this)
    }

    onRelease = () => {
        console.log('Released a peg')
        this.board.joinPreparedPeg(this)
    }

    joinTo: (peg: Peg) => Band = (peg) => {
        const band = new Band(this, peg)
        this.bands.push(band)
        peg.bands.push(band)
        return band
    }

    removeBand: (band: Band) => void = (band) => {
        this.bands.splice(this.bands.indexOf(band), 1)
    }

    gonnaDieSoon = () => {
        this.ticker.add(this.blink)
    }

    destroy() {
        this.ticker.remove(this.blink)
        const allBands = [...this.bands]
        allBands.forEach(band => {
            this.board.removeBand(band)
            band.destroy()
        })
        super.destroy()
    }

    private blink = () => {
        this.alpha += this.blinkDirection
        if (this.alpha <= 0 || this.alpha >= 1) {
            this.blinkDirection *= -1
        }
    }
}