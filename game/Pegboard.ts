import * as PIXI from 'pixi.js'
import { Peg } from './Peg'
import { Band } from './Band'

export class Pegboard extends PIXI.Container {
    readonly pegs: Peg[]
    readonly bands: Band[]
    private preparedPeg: Peg

    constructor() {
        super()

        this.pegs = []
        this.bands = []
        this.preparedPeg = null

        this.interactive = true
    }

    killOldestPeg = () => {
        const peg = this.pegs.shift()
        if (peg) peg.destroy()
    }

    makePeg: (x: number, y: number) => Peg = (x, y) => {
        const peg = new Peg(x, y, this)
        this.addChild(peg)
        this.pegs.push(peg)
        return peg
    }

    prepareBand = (peg: Peg) => {
        this.preparedPeg = peg
    }

    joinPreparedPeg: (to: Peg) => Band = (to) => {
        const band = this.joinPegs(this.preparedPeg, to)
        this.prepareBand = null
        return band
    }

    joinPegs: (first: Peg, second: Peg) => Band = (first, second) => {
        const band = first.joinTo(second)
        this.addChild(band)
        this.bands.push(band)

        return band
    }

    removeBand: (band: Band) => void = (band) => {
        this.bands.splice(this.bands.indexOf(band), 1)
    }
}