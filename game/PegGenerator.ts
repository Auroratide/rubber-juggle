import * as PIXI from 'pixi.js'
import { Pegboard } from './Pegboard'
import { RepeatingTask } from './RepeatingTask'

export class PegGenerator {
    private width: number
    private height: number
    private board: Pegboard
    private task: RepeatingTask

    constructor(width: number, height: number, board: Pegboard, ticker: PIXI.Ticker) {
        this.width = width
        this.height = height
        this.board = board
        this.task = new RepeatingTask(ticker, () => {
            this.board.makeRandomPeg()
            this.board.killOldestPeg()
        }, () => Math.random() * 2500 + 2500)
    }

    start = () => {
        this.task.start()
    }

    stop = () => {
        this.task.stop()
    }
}