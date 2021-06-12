import * as PIXI from 'pixi.js'
import { Peg } from './Peg'
import { Band } from './Band'

export class Pegboard extends PIXI.Container {
    readonly bands: Band[]
    private preparedPeg: Peg

    constructor() {
        super()

        this.bands = []
        this.preparedPeg = null

        this.interactive = true
    }

    makePeg: (x: number, y: number) => Peg = (x, y) => {
        const peg = new Peg(x, y, this)
        this.addChild(peg)
        return peg
    }

    prepareBand = (peg: Peg) => {
        this.preparedPeg = peg
    }

    joinPreparedPeg: (to: Peg) => Band = (to) => {
        return this.joinPegs(this.preparedPeg, to)
    }

    joinPegs: (first: Peg, second: Peg) => Band = (first, second) => {
        const band = new Band(first, second)
        this.addChild(band)
        this.bands.push(band)

        return band
    }
}