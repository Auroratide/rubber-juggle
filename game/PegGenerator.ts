import * as PIXI from 'pixi.js'
import { Pegboard } from './Pegboard'

export class PegGenerator {
    private width: number
    private height: number
    private board: Pegboard
    private ticker: PIXI.Ticker

    constructor(width: number, height: number, board: Pegboard, ticker: PIXI.Ticker) {
        this.width = width
        this.height = height
        this.board = board
        this.ticker = ticker
    }

    start = () => {
        // this.ticker.add(() => {

        // })

        const addPeg = () => {
            this.board.makePeg(Math.random() * this.width, Math.random() * this.height)
            setTimeout(addPeg, Math.random() * 2500 + 2500)
        }

        setTimeout(addPeg, 2500)
    }
}